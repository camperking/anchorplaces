import multer from 'multer';
import sharp from 'sharp';
import getHash from '../../../hash.js';
import { pics } from '../../../db.js';
import { ObjectID } from 'mongodb';
import authenticate from '../user/_auth.js';


export async function get(req, res) {

    try {

        const _id = new ObjectID(req.params.pic);

        const pic = await pics.findOne({_id});

        res.end(JSON.stringify(pic));

    } catch {
        res.end('{ "error": "invalid id" }');
    }

}


export async function post(req, res) {

    const user = await authenticate(req.session.id);

    if (user) {

        try {

            await useMulter(req);

            if (req.file.mimetype === 'image/jpeg') {
    
                const hash = getHash(req.file.originalname + new Date().valueOf());
    
                const filename = './static/pics/' + hash + '.webp';
    
                const picFile = await sharp(req.file.buffer).resize(1024, 786).toFile(filename);

                const pic = {};
                pic.originalname = req.file.originalname;
                pic.url = 'pics/' + hash + '.webp';
                pic.size = picFile.size;
                pic.author = user.username;
                pic.author_id = user._id;
                pic.category = req.query.category;
                pic.uploaded = new Date();
                pic.title = '';
                pic.desc = '';
    
                const inp = await pics.insertOne(pic);

                res.end(JSON.stringify(inp.ops[0]));
            }
            
        } catch (err) {
            console.log(err);
            res.end('{error: "error"}');
        }

    } else {
        res.end('{error: "no access"}');
    }

}

export async function put(req, res) {

    const pic = req.body;

    const user = await authenticate(req.session.id);

    if (user) {

        try {

            const _id = new ObjectID(pic._id);

            const checkPic = await pics.findOne({_id});

            if (checkPic.author_id.toHexString() === user._id.toHexString()) {

                delete pic._id;
                const update = await pics.updateOne({_id}, { $set: pic });

                res.end('{ "success": true }');

            } else {
                res.end('{ "error": "no access" }');
            }

        } catch (err) {
            res.end('{ "error": "invalid id" }');
        }
        
    } else {
        res.end('{ "error": "no access" }');
    }

}

export async function del(req, res) {

    

}

function useMulter (req) {
    return new Promise((resolve, reject) => {
        const upload = multer().single('picture');
        upload(req, '', err => {
            if (err) reject();
            resolve();
        });
    });
}