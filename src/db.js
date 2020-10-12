import { MongoClient } from 'mongodb';

const url = 'mongodb://node:arsch123@localhost:27017/test';
const dbname = 'test';

const dbClient = new MongoClient(url, {useUnifiedTopology: true});

export let users;
export let pics;
export let votes;
export let places;

let db;


function exportCollections() {
    users = db.collection('users');
    pics = db.collection('pics');
    votes = db.collection('votes');
    places = db.collection('places');
}

export default function dbInit() {
    return new Promise((resolve, reject) => {
        dbClient.connect((err) => {
            if (err) {
                reject(err);
            } else {
                // export database object
                db = dbClient.db(dbname);
                exportCollections();
                resolve();
            }
        })
    });
}