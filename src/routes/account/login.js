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
        
        const user = await users.find({ 'username': username }).toArray();

        if (user.length >= 1 && getHash(password) === user[0].password) {    //login successful

            let newSessionId = getHash(username + Math.random());
            
            // update session id
            await users.updateOne({ 'username': username },
                 { $set: { 'sessionid': newSessionId } });

                 session.id = newSessionId;

                 res.statusCode = 200;
                 
        }
        
        res.end(JSON.stringify({id: session.id, userid: user[0]._id}));
        
    }

}