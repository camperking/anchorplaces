export default function authenticate  (req, res, next) {
    console.log(req.body.username);
    next();
}
