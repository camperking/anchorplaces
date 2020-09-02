export async function get(req, res, next) {
	req.session = null;
    res.statusCode = 302;
    res.end();
}