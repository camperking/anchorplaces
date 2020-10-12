import { string, object } from 'yup';

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