import { db } from '../../../server.js';
import { ObjectID } from 'mongodb';
import authenticate from '../../account/_auth.js';
import hasVoted from '../_hasVoted.js';

export async function get (req, res) {

    res.statusCode = 200;
    res.end();
    
    const [ objectid ] = req.params.slug;

    const user = await authenticate(req.session.id);

    let object = new ObjectID(objectid);

    if (user) {

        const voted = await hasVoted(user, object);

        if (voted.vote > -1 || !voted) {

            const votes = db.collection('votes');

            const vote = {
                object,
                userid: user._id,
                vote: -1
            }

            await votes.replaceOne({ object, userid: user._id }, vote, { upsert: true });

        }

    }

}
