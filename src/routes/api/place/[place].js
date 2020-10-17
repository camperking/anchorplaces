import { ObjectID } from "mongodb";
import { pics, places } from "../../../db";
import { placeScheme } from "../../../validationSchemes";
import authenticate from "../user/_auth";

export async function get(req, res) {

    const placeid = req.params.place;

    try {

        const _id = new ObjectID(placeid);

        const place = await places.findOne({_id});

        if (place) {
            
            const pictures = await Promise.all(place.pictures.map(async (id) => {

                const pic_id = new ObjectID(id);

                const picsData = await pics.findOne({_id: pic_id});
                
                return picsData;

            }));

            place.pictures = pictures;
            // console.log(pictures);
            // place.pictures.map(id => {

            //     const pic_id = new ObjectID(id);

            //     const picsData = await pics.findOne({_id: pic_id});
                
            //     // console.log();

            // });


            res.end(JSON.stringify(place));
        } else {
            res.end('{ "error": "no place" }');
        }

        

    } catch (err) {
        console.log(err);
        res.end('{ "error": "bad id" }');
    }
}


export async function post(req, res) {
    // console.log(req.body);

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