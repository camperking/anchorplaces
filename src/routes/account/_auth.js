import { db } from '../../db.js';


export default async function authenticate (sessionid) {

    if ( typeof sessionid === 'string' ) {

            const users = db.collection('users');

            const user = await users.findOne({sessionid});

            if (user === null) { 
                return false;
            } else {
                return user;
            }

    }

}