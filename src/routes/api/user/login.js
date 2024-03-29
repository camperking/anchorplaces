import { users } from '../../../db.js';
import getHash from '../../../hash.js';
import { loginScheme } from '../../../validationSchemes.js';


export async function post(req, res, next) {

    try {

        const body = await loginScheme.validate(req.body);

        const { username, password } = body;

        const user = await users.find({ username }).toArray();

        if (user.length >= 1 && getHash(password) === user[0].password) {    //login successful

            let sessionid = getHash(username + Math.random());
            
            // update session id
            const asd = await users.updateOne({ username }, { $set: { sessionid } });
            
            req.session.id = sessionid;
            req.session.userid = user[0]._id;
            // console.log(user[0])
            req.session.username = user[0].username;

            res.end(JSON.stringify({sessionid, userid: user[0]._id, username: user[0].username}));

        } else {
            throw 'bad login';
        }
        
        

    } catch (err) {

        let errMsg = {error: err};  // send as response

        if (err.message) {      // if yup validation error get error message
            errMsg.error = err.message;
        }

        res.end(JSON.stringify(errMsg));
    }


}