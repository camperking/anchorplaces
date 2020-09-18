import { db } from '../../server.js';
import { authScheme } from './_validationSchemes.js';


export default async function authenticate (sessionid) {
    if (sessionid) {
        try { 
            const authId = authScheme.validateAsync({sessionid});

            const users = db.collection('users');

            const user = await users.findOne({sessionid});

            if (user === null) { 
                return false;
            } else {
                return user;
            }

        } catch (err) {
            return false;
        }

    }

}