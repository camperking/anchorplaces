import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import dbInit from './db.js';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

console.log('connecting to mongodb');

dbInit().then(() => {

	console.log('connected to mongodb');

	polka() // You can also use Express
	.use(
		cookieSession({ keys: ['key'] }),
		bodyParser.json(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({		// populate sapper store
			session: (req, res) => ({
				id: req.session.id,
				userid: req.session.userid,
				username: req.session.username
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

}).catch(err => {
	console.log(err);
})


