import { db } from '../../server.js';
import getHash from '../../hash.js';
//import crypto from 'crypto';

const usernamePattern = /^([A-Za-z0-9€#\.+-]){4,20}$/;


export async function post(req, res, next) {

    const users = db.collection('users');
    const { username, password } = req.body;

    let auth = false;
    let session = req.session;

    session.id = false;

    if ((username && password) && usernamePattern.test(username)) {
        
        users.find({ 'username': username }).toArray((err, docs) => {
            if (err) res.end(err);
            console.log('find user');
            if (docs.length >= 1 && getHash(password) === docs[0].password) {    //login successful
                console.log('user found');

                let newSessionId = getHash(username + Math.random());

                // update session id
                users.updateOne({ 'username': username },   
                    { $set: { 'sessionid': newSessionId } },
                    (err, result) => {
                        if (err) res.end(err);

                        //set session to header for cookies
                        session.id = newSessionId;

                        res.statusCode = 200;
                        res.end(JSON.stringify({id: session.id}));
                    });

            } else {
                // user not found or password incorrect
                res.end(JSON.stringify({id: session.id}));

            }
        });
    } else {
        res.end(JSON.stringify({id: session.id}));
    }
}