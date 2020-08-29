import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
//import passport from 'passport';
//import { Strategy } from 'passport-local';
import authenticate from './auth.js';


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// passport.use(new Strategy({}, (username, password, done) => {
// 	console.log('username')
// 	console.log(username);
// 	if (username == "asd") {
// 		return done(null, username);
// 	} else {
// 		return done(null, false);
// 	}
// }));

// passport.serializeUser(function (user, cb) {
//     cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//     cb(null, obj);
// });

// function authenticate  (res, req, next) {
//     console.log("qwerty");
//     next();
// }


polka() // You can also use Express
	//.use(passport.initialize())
	.use(bodyParser.urlencoded())
	// .use(passport.session())
	// .post('/login', passport.authenticate('local', (req, res) => {
	// 	console.log(req);
	// 	//res.redirect('/');
	// }))
	//.post('/login', passport.authenticate('local'))
	// .post('/login', (req, res, done) => {
	// 	console.log(req.body);
	// 	done(null);
	// })
	// .post('/login', (req, res, done) => {
	// 	const authResult = authenticate(req.body.username, req.body.password)
	// 	if (authResult) {
	// 		res.redirect('/');
	// 	}
	// })
	//.use(authenticate)
	.post('/login', authenticate)
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});