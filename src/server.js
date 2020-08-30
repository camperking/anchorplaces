import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import authenticate from './auth.js';
import cookieSession from 'cookie-session';
import { MongoClient } from 'mongodb';
const url = 'mongodb://node:arsch123@localhost:27017/test';
const dbname = 'test';
export var db;
const app = polka();
const dbClient = new MongoClient(url, {useUnifiedTopology: true});


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

app
	.use(cookieSession({ keys: ['key'] }))
	.use(bodyParser.urlencoded({ extended: false }))
	.use(authenticate);

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware({		// populate sapper store
			session: (req, res) => ({
			id: req.session.id,
			auth: req.session.auth
		})
	})
);

dbClient.connect((err) => {
	if (err) {
		console.log("no db connection");
	} else {
		// export database object
		db = dbClient.db(dbname);

		app.listen(PORT, err => {
			if (err) console.log('error', err);
		})
	}
})
