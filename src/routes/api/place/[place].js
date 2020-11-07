import { ObjectID } from "mongodb";
import { pics, places } from "../../../db";
import { placeScheme } from "../../../validationSchemes";
import authenticate from "../user/_auth";

export async function get(req, res) {

    const placeid = req.params.place;

    if (placeid == 0) {

        const query = {};

        if (req.query.user) {
            const author_id = new ObjectID(req.query.user);
            query.author_id = author_id;
        }

        const limit = req.query.limit ? Number(req.query.limit) : 8;
        const latitude = req.query.lat ? Number(req.query.lat) : 0;
        const longitude = req.query.lon ? Number(req.query.lon) : 0;
        const dist = req.query.dist ? Number(req.query.dist * 1.865 * 1000) : 186500000;

        query.position = {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                $maxDistance: dist
            }
        };

        let placesResult = await places.find(query).limit(limit).toArray();

        placesResult = await Promise.all(placesResult.map(async (place) => {
            place.pictures = await getPictures(place.pictures);
            return place;
        }));

        res.end(JSON.stringify(placesResult))


    } else {

        try {

            const _id = new ObjectID(placeid);

            const place = await places.findOne({_id});

            if (place) {

                const pictures = await getPictures(place.pictures);

                place.pictures = pictures;

                res.end(JSON.stringify(place));
            } else {
                res.end('{ "error": "no place" }');
            }

            

        } catch (err) {
            console.log(err);
            res.end('{ "error": "bad id" }');
        }
    }
}


export async function post(req, res) {

    const user = await authenticate(req.session.id);

    if (user) {
        try {

            const newPlace = await placeScheme.validate(req.body);

            newPlace.created = new Date();
            newPlace.author = user.username;
            newPlace.author_id = user._id;
            newPlace.position = {
                type: 'Point',
                coordinates: [newPlace.longitude, newPlace.latitude]
            };

            delete newPlace.longitude;
            delete newPlace.latitude;

            const insert = await places.insertOne(newPlace);



            res.end(JSON.stringify(insert.ops[0]._id));



        } catch (err) {
            console.log(err);
            res.end('{ "error": "bad input" }');
        }


    } else {
        res.end('{ "error": "no access" }');
    }

}


async function getPictures(ids) {
    return await Promise.all(ids.map(async (id) => {

        const pic_id = new ObjectID(id);

        const picsData = await pics.findOne({_id: pic_id});
        
        return picsData;

    }));

}