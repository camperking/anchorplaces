import formidable from 'formidable';
import { db } from '../server.js';
import Jimp from 'jimp';

const pictureDir = './static/pics/';

export async function post(req, res, next) {
    if (!req.session.auth) res.end('no access');

    const form = formidable({multiples: true, uploadDir: pictureDir, keepExtensions: true});
    const places = db.collection('places');
    

    form.parse(req, (err, fields, files) => {
        if (err) res.end('bad formular input');

        //todo check and escape input

        var pictures = [];

        var doc = {     // document for database
            'author': req.session.user,
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
            pictures.push({
                'path': files.pictures.path,
                'name': files.pictures.name,
                'size': files.pictures.size,
                'type': files.pictures.type
            });
        } else {    // more pics uploaded
            files.pictures.forEach((val, index) => {
                pictures.push({
                    'path': files.pictures[index].path,
                    'name': files.pictures[index].name,
                    'size': files.pictures[index].size,
                    'type': files.pictures[index].type
                });
            });
        }

        
        let processPics = pictures.map((pic, index) => {
            return new Promise((resolve, reject) => {
                Jimp.read(pic.path, (err, image) => {
                    if (err) reject(err);

                    const newPicPath = pic.path + '.webImage';

                    image.resize(1024, Jimp.AUTO);
                    image.write(newPicPath);
               
                    // update document for database
                    pic.webPath = newPicPath;

                    resolve();
                });
            })
        });

        Promise.all(processPics).then(() => {
            console.log(doc);
            //insert into database
            places.insertOne(doc, (err, result) => {
                if (err) res.end(err);

                // redirect to new entry
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        }).catch(err => {
            res.end(err);
        });
        
    });

}