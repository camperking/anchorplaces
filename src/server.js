import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { MongoClient } from 'mongodb';
const url = 'mongodb://node:arsch123@localhost:27017/test';


const app = polka();

const dbname = 'test';
const dbClient = new MongoClient(url, {useUnifiedTopology: true});
export var db;

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

app
	.use(cookieSession({ keys: ['key'] }))
	//.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json());
	//.use(authenticate);

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware({		// populate sapper store
			session: (req, res) => ({
			id: req.session.id,
			userid: req.session.userid
		})
	})
	//sapper.middleware()
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
