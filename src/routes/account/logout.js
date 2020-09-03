export async function get(req, res, next) {
	req.session = null;     // delete session cookies
    res.statusCode = 302;
    res.end();
}