import { db } from '../../server.js';
import formidable from 'formidable';
import Jimp from 'jimp';
import { ObjectID } from 'mongodb';
import authenticate from '../account/_auth.js';

const uploadDir = './static/pics/';
const webPicDir = './pics/';

let user;

export async function get(req, res, next) {

    const places = db.collection('places');

    // /place/:method/:location/:many
    // methods are id || rnd || near
    let [ method, location, many ] = req.params.slug;

    many = Number(many);

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

    // authentication = get user document
    user = await authenticate(req.session.id);

    if (user) {

        res.statusCode = 200;
        res.end();

        const doc = await parseForm(req, user);

        const places = db.collection('places');

        places.insertOne(doc);        
        
    } else {
        res.end('no access');
    }

}

export async function update (req, res, next) {

    // authentication = get user document
    user = await authenticate(req.session.id);

    if (user) {

        res.statusCode = 200;
        res.end();

        const doc = await parseForm(req, user);

        const places = db.collection('places');

        const [ placeId ] = req.params.slug;

        places.updateOne({ _id: placeId }, { $set: doc });        
        
    } else {
        res.end('no access');
    }

}

export async function del (req, res, next) {

    // authentication = get user document
    user = await authenticate(req.session.id);

    if (user) {

        res.statusCode = 200;
        res.end();

        const places = db.collection('places');

        const [ placeId ] = req.params.slug;

        places.deleteOne({ _id: placeId, authorId: user._id });  

    } else {
        res.end('no access');
    }

}

async function parseForm (req, user) {

    const form = formidable({multiples: true, uploadDir: uploadDir, keepExtensions: true});

    let doc = await new Promise(function (resolve, reject) {

        form.parse(req, async (err, fields, files) => {
            if (err) reject(err);
            
            let pictures = [];
    
            if (files.pictures.path) {      // only one picture uploaded
    
                let {path, name, size, type} = files.pictures;
    
                path = await convertPics(path);
    
                pictures.push({ path, name, size, type });
    
            } else {    // more pics uploaded
                await files.pictures.map( async (val, index) => {
    
                    let {path, name, size, type} = files.pictures[index];
    
                    path = await convertPics(path);
    
                    pictures.push({ path, name, size, type });
    
                });
            }
    
            const doc = {     // const ?
                'author': user.username, // get user from db via sessionid
                'author_id': user._id,
                'name': fields.name,
                'location': {
                    'type': 'Point',
                    'coordinates': [fields.longitude, fields.latitude]
                },
                'pictures': pictures,
                'avgDepth': fields.avgDepth,
                'notes': fields.notes
            };
    
            resolve(doc);
    
        });

    })

    return doc;

}


async function convertPics (path) {

    let image = await Jimp.read(path);

    image.resize(1024, Jimp.AUTO);
    image.write(path + '.web');

    let filename = path.split('\\');
    const webPath = webPicDir + filename[1];

    return webPath;

}