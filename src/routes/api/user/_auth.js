import { users } from '../../../db.js';


export default async function authenticate (sessionid) {

    if ( typeof sessionid === 'string' ) {

            const user = await users.findOne({sessionid});

            if (user === null) { 
                return false;
            } else {
                return user;
            }

    }

}