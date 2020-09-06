import { db } from '../../server.js';


export default async function hasVoted (user, object) {

    const votes = db.collection('votes');

    const vote = await votes.findOne({ object, userid: user._id });

    if (vote != null) {

        return vote;

    } else {    // not voted yet

        return false;

    }

}