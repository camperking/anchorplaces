import { db } from '../../../db.js';


export default async function hasVoted (user, object, key) {

    const votes = db.collection('votes');

    const vote = await votes.findOne({ object, key, userid: user._id });

    if (vote != null) {

        return vote;

    } else {    // not voted yet

        return false;

    }

}