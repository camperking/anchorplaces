import { users } from '../../../db.js';
import getHash from '../../../hash.js';
import { registerScheme } from '../../../validationSchemes.js';


export async function post(req, res, next) {
    try {

        const body = await registerScheme.validate(req.body);
        
        const { username, password, email } = body;

        const user = await users.find({ 'username': username }).toArray();

        // result from db empty, create new user
        if (user.length === 0) {

            let sessionid = getHash(username + Math.random());

            req.session.id = sessionid;  // set session cookies

            body.sessionid = sessionid; // set database sessionid

            body.password = getHash(password);  // hash password

            body.registered = new Date();


            const result = await users.insertOne(body);
            
            const userid = result.ops[0]._id;

            req.session.userid = userid;
            
            res.end(JSON.stringify({sessionid, userid }));

        } else {         
            res.end('{ "error": "user exists" }');
        }

    } catch (err) {
        
        console.log(err);

        res.end('{ "error": "bad input" }');
    }
}