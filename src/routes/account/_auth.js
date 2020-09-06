import { db } from '../../server.js';


export default async function authenticate (sessionid) {

    const users = db.collection('users');

    const docs = await users.find({sessionid}).toArray();

    if ( docs.length === 1 ) { 
        // console.log(docs[0]._id);
        return docs[0];
    } else {
        return false;
    }


}