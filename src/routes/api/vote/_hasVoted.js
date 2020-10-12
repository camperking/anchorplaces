import { votes } from '../../../db.js';


export default async function hasVoted (user, object, key) {

    const vote = await votes.findOne({ object, key, userid: user._id });

    if (vote != null) {

        return vote;

    } else {    // not voted yet

        return false;

    }

}