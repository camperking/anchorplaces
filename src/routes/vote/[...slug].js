import { db } from '../../server.js';
import { ObjectID } from 'mongodb';
import authenticate from '../account/_auth.js';
import hasVoted from './_hasVoted.js';

export async function get(req, res) {

    const [ objectid ] = req.params.slug;

    const user = await authenticate(req.session.id);

    const object = new ObjectID(objectid);

    const votesdb = db.collection('votes');

    const votes = await votesdb.find({ object }).toArray();

    let doc = {
        sum: 0,
        hasVoted: false
    }

    let sum = 0;

    votes.forEach( vote => {
        sum = sum + vote.vote;
    });

    doc.sum = sum;

    if (user) {

        const voted = await hasVoted(user, object);

        if (voted) doc.hasVoted = voted.vote;

    }

    res.end(JSON.stringify(doc));

}
