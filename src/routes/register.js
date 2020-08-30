import { db } from '../server.js';
import authenticate from '../auth.js';

export async function post(req, res, next) {
    var username = req.body.newUsername;
    var password = req.body.newPassword;
        
    const users = db.collection('users');

    users.find({ 'username': username }).toArray((err, docs) => {
        if (err) next(err);

        if(docs.length == 0) {      //user not in database
            users.insertOne({'username': username, 'password': password}, (err, result) => {
                if (err) next(err);
                //user created

                //set login credentials
                req.body.username = username;
                req.body.password = password;
                
                //rerun authentication for login after register and redirect
                authenticate(req, res, () => {
                    res.statusCode = 302;
                    res.setHeader('Location', '/account');
                    res.end();
                });
            });
        } else {
            res.end('user exists');
        }
    })
}