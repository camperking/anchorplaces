import { db } from './server.js';
import crypto from 'crypto';
import getPwdHash from './pwdHash.js';

//const users = db.collection('user');


export default function authenticate(req, res, next) {
    const users = db.collection('users');
    var auth = false;
    var session = req.session;

    if (req.session.id) {
        users.find({ 'sessionid': req.session.id }).toArray((err, docs) => {
            if (err) next(err);

            if (docs.length === 1) {
                auth = true;
            }

            session.auth = auth;
            next();
        });


    } else if (req.body.username && req.body.password) {
        const usernamePattern = /^([A-Za-z0-9€#\.+-]){4,20}$/gm;

        if (!usernamePattern.test(req.body.username)) res.end('bad username');

        var username = req.body.username;
        var password = req.body.password;

        users.find({ 'username': username }).toArray((err, docs) => {
            if (err) next(err);

            if (docs.length >= 1 && getPwdHash(password) === docs[0].password) {    //login successful
                session.user = username;       //set session

                var temphash = username + Math.random();
                var hash = crypto.createHash('sha256');
                hash.update(temphash);
                var newSessionId = hash.digest('base64');

                users.updateOne({ 'username': username },   //update session id
                    { $set: { 'sessionid': newSessionId } },
                    (err, res) => {
                        if (err) next(err);
                        session.id = newSessionId;     //set session to header for cookies
                        session.auth = true;
                        next();
                    })
            } else {
                console.log('user not found or password incorrect');
                session.id = null;
                session.auth = null;
                next();
            }
        });
    } else {
        next();
    }
}