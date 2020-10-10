import { db } from '../../../../db.js';
import { ObjectID } from 'mongodb';
import authenticate from '../../user/_auth.js';
import hasVoted from '../_hasVoted.js';

export async function get (req, res) {

    res.statusCode = 200;
    res.end();
    
    const [ objectid, key ] = req.params.slug;

    const user = await authenticate(req.session.id);

    

    if (user) {

        let object = new ObjectID(objectid);

        const voted = await hasVoted(user, object, key);

        if (voted.vote > -1 || !voted) {

            const votes = db.collection('votes');

            const vote = {
                object,
                key,
                userid: user._id,
                vote: -1
            }

            await votes.replaceOne({ object, key, userid: user._id }, vote, { upsert: true });

        }

    }

}
