import crypto from 'crypto';
const salt = "eyJ1c2VyIjoicG9pdXoiLCJpZCI6bnVsbCwiYXV0aCI6bnVsbH0";


export default function getHash (password) {
    var hash = crypto.createHash('sha256');
    hash.update(salt + password);
    return hash.digest('base64');
}