export async function get(req, res, next) {
    console.log("logout");
	req.session.id = null;
    req.session.auth = null;
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
}