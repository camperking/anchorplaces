import { votes } from '../../../db.js';


export default async function sumVotes(object, key) {
    const allVotes = await votes.find({ object, key }).toArray();
    let sum = 0;

    allVotes.forEach( vote => {
        sum = sum + vote.vote;
    });

    return sum;
}