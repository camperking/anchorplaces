import authenticate from '../auth.js';

export async function post(req, res, next) {

    if (req.session.auth == true) {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else {
        res.end('bad login');
    }
}