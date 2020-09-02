import { db } from './server.js';
import crypto from 'crypto';
import getHash from './hash.js';

// authentication middleware

export default function authenticate(req, res, next) {
    const users = db.collection('users');
    let auth = false;
    let session = req.session;

    //console.log(req.body);

    // previous session with id
    if (req.session.id) {
        users.find({ 'sessionid': req.session.id }).toArray((err, docs) => {
            if (err) next(err);

            if (docs.length === 1) {
                auth = true;
            }

            // session.auth = auth;
            // session.user = docs[0].username;
            next();
        });
    } else { next() }

        // login with username password
    // } else if (req.body.username && req.body.password) { 
    //     const usernamePattern = /^([A-Za-z0-9€#\.+-]){4,20}$/gm;

    //     if (!usernamePattern.test(req.body.username)) res.end('bad username');

    //     var username = req.body.username;
    //     var password = req.body.password;

    //     users.find({ 'username': username }).toArray((err, docs) => {
    //         if (err) next(err);

    //         if (docs.length >= 1 && getPwdHash(password) === docs[0].password) {    //login successful

    //             var temphash = username + Math.random();
    //             var hash = crypto.createHash('sha256');
    //             hash.update(temphash);
    //             var newSessionId = hash.digest('base64');

    //             //update session id
    //             users.updateOne({ 'username': username },   
    //                 { $set: { 'sessionid': newSessionId } },
    //                 (err, res) => {
    //                     if (err) next(err);

    //                     //set session to header for cookies
    //                     session.id = newSessionId;     
    //                     session.auth = true;
    //                     next();

    //                 })

    //         } else {

    //             console.log('user not found or password incorrect');
    //             session.id = null;
    //             session.auth = null;
    //             next();

    //         }
    //     });
    // } else {
    //     next();
    // }
}