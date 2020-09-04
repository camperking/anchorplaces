import { db } from '../../server.js';
import formidable from 'formidable';
import Jimp from 'jimp';
import { ObjectID } from 'mongodb';
import authenticate from '../account/_auth.js';

const uploadDir = './static/pics/';
const webPicDir = './pics/';


export async function get(req, res, next) {

    const places = db.collection('places');

    // /place/:method/:location/:many
    let [ method, location, many ] = req.params.slug;
    many = Number(many);
    console.log(method);
    console.log(location);
    console.log(many);

    switch (method) {
        case 'id':

            try {

                const _id = new ObjectID(location);

                const docs = await places.find({ '_id': _id }).toArray();

                res.end(JSON.stringify(docs));

            } catch (err) {

                res.end('id invalid');

            }

        break;

        case 'rnd':

            if ( 1 <= many < 16 ) {

                const docs = await places.find({}).limit(many).toArray();

                res.end(JSON.stringify(docs));

            }
            
        break;

        case 'near':
            
            res.end('to be done');

        break;
        default:
            res.end('bad method');
    }

}


export async function post(req, res, next) {
    

    // authentication
    const user = await authenticate(req.session.id);
    console.log(user);

    if (user) {

        res.statusCode = 200;
        res.end();

        const form = formidable({multiples: true, uploadDir: uploadDir, keepExtensions: true});
        
        form.parse(req, async (err, fields, files) => {

            var doc = {     // const ?
                'author': user._id, // get user from db via sessionid
                'locationName': fields.name,
                'location': {
                    'type': 'Point',
                    'coordinates': [fields.longitude, fields.latitude]
                },
                'pictures': pictures,
                'avgDepth': fields.avgDepth,
                'notes': fields.notes
            };


            var pictures = [];

            if (files.pictures.path) {      // only one picture uploaded

                let {path, name, size, type} = files.pictures;
                pictures.push({path, name, size, type});

                await convertPics(path);
    
            } else {    // more pics uploaded
                await files.pictures.map( async (val, index) => {
    
                    let {path, name, size, type} = files.pictures[index];

                    path = await convertPics(path);

                    pictures.push({path, name, size, type});
    
                });
            }

            const places = db.collection('places');
            places.insertOne(doc);

        });
        
        
    } else {
        res.end('no access');
    }

}

async function convertPics (path) {

    let image = await Jimp.read(path);

    image.resize(1024, Jimp.AUTO);
    image.write(path + '.web');

    let filename = pic.path.split('\\');
    const webPath = webPicDir + filename[1];

    return webPath;

}

export async function post_old(req, res, next) {
    if (!req.session.auth) res.end('no access');

    res.statusCode = 200;
    res.end();

    const form = formidable({multiples: true, uploadDir: pictureDir, keepExtensions: true});
    const places = db.collection('places');
    

    form.parse(req, (err, fields, files) => {
        if (err) console.log('bad formular input');

        //todo check and escape input

        var pictures = [];

        // document for database
        var doc = {     // const ?
            'author': req.session.user, // get user from db via sessionid
            'locationName': fields.name,
            'location': {
                'type': 'Point',
                'coordinates': [fields.longitude, fields.latitude]
            },
            'pictures': pictures,
            'avgDepth': fields.avgDepth,
            'notes': fields.notes
        };

        if (files.pictures.path) {      // only one picture uploaded

            let {path, name, size, type} = files.pictures;
            pictures.push({path, name, size, type});

            // pictures.push({
            //     'path': files.pictures.path,
            //     'name': files.pictures.name,
            //     'size': files.pictures.size,
            //     'type': files.pictures.type
            // });

        } else {    // more pics uploaded
            files.pictures.forEach((val, index) => {

                let {path, name, size, type} = files.pictures[index];
                pictures.push({path, name, size, type});

                // pictures.push({
                //     'path': files.pictures[index].path,
                //     'name': files.pictures[index].name,
                //     'size': files.pictures[index].size,
                //     'type': files.pictures[index].type
                // });

            });
        }

        
        


        // pics promise array
        let processPics = pictures.map((pic, index) => {

            return new Promise((resolve, reject) => {

                Jimp.read(pic.path, (err, image) => {
                    if (err) reject(err);

                    const newPicPath = pic.path + '.webImage';
                    let filename = pic.path.split('\\');
                    const webPath = webPicDir + filename[1] + '.webImage'

                    image.resize(1024, Jimp.AUTO);
                    image.write(newPicPath);
               
                    // update document for database
                    pic.webPath = webPath;

                    resolve();
                    
                });
            })
        });

        Promise.all(processPics).then(() => {

            // insert into database
            places.insertOne(doc, (err, result) => {
                if (err) console.log(err);

            });

        }).catch(err => {
            console.log(err);
        });

    });

}

