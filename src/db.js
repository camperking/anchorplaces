import { MongoClient } from 'mongodb';

export let db;

const url = 'mongodb://node:arsch123@localhost:27017/test';
const dbname = 'test';

const dbClient = new MongoClient(url, {useUnifiedTopology: true});

export default function dbInit() {
    return new Promise((resolve, reject) => {
        dbClient.connect((err) => {
            if (err) {
                reject(err);
            } else {
                // export database object
                db = dbClient.db(dbname);
                resolve();
            }
        })
    });
}