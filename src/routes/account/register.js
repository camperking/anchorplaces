import { db } from '../../server.js';
import getHash from '../../hash.js';

const usernamePattern = /^([A-Za-z0-9€#\.+-]){4,20}$/;

export async function post(req, res, next) {

    // get inputs from parsed json body
    const users = db.collection('users');
    const { username, password } = req.body;

    let session = req.session;

    if ((username && password) && usernamePattern.test(req.body.username)) {

        const user = await users.find({ 'username': username }).toArray();

        // result from db empty, create new user
        if (user.length === 0) {

            let sessionid = getHash(username + Math.random());

            session.id = sessionid;  // set session cookies

            const result = await users.insertOne({username, 'password': getHash(password), sessionid});
            //console.log(result.ops[0]._id);
            const userid = result.ops[0]._id;
            console.log(userid);
            res.end(JSON.stringify({id: sessionid, userid }));

        }

    }

}