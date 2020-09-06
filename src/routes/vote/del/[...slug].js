import { db } from '../../../server.js';
import { ObjectID } from 'mongodb';
import authenticate from '../../account/_auth.js';
import hasVoted from '../_hasVoted.js';

export async function get (req, res) {

    res.statusCode = 200;
    res.end();
    
    const [ objectid, key ] = req.params.slug;

    const user = await authenticate(req.session.id);

    if (user) {

        let object = new ObjectID(objectid);

        const voted = await hasVoted(user, object, key);

        if (voted) {

            const votes = db.collection('votes');

            votes.deleteOne({ object, key, userid: user._id });

        }


    }

}