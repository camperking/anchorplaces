import { string, object, array, number, boolean } from 'yup';

export const registerScheme = object().shape({
    username: string().required(),
    email: string().email().required(),
    password: string().required()
});

export const loginScheme = object().shape({
    username: string().required(),
    password: string().required()
});

export const picInfo = object().shape({
    _id : string().required(),
    title: string(),
    desc: String()
});

export const placeScheme = object().shape({
    name: string().required(),
    desc: string(),
    longitude: number().min(-180).max(180).required().typeError('longitude is a required field'),
    latitude: number().min(-90).max(90).required().typeError('latitude is a required field'),
    depth: number().min(1).max(100),
    ground: string().matches(/(sand|gravel|mud|clay|rocks|plants)/),
    shelter: object().shape({
        east: boolean(),
        north: boolean(),
        north_east: boolean(),
        north_west: boolean(),
        south: boolean(),
        south_east: boolean(),
        south_west: boolean(),
        west: boolean()
    }),
    services: array().of(object().shape({
        name: string(),
        available: boolean()
    })),
    pictures: array().of(string())
});