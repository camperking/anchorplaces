import { db } from '../server.js';
import formidable from 'formidable';
import Jimp from 'jimp';

const pictureDir = './static/pics/';
const webPicDir = './pics/';

export function get(req, res, next) {

    let n = 6;

    if (Number(req.query.n) > 1) n = Number(req.query.n);

    const placesdb = db.collection('places');

    placesdb.find({}).limit(n).toArray((err, docs) => {
        if (err) next(err);

        res.end(JSON.stringify(docs));
    });

}

export function post(req, res, next) {
    if (!req.session.auth) next('no access');

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

