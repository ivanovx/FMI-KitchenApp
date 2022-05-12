import { object, string, number, date } from 'yup';

export const userSchema = object({
    id: string().required(), // to 24
    name: string().required(),  
    username: string().required(), // to 15
    password: string().required(), // min 8
    description: string().nullable(),
    gender: string().required(), // male or female
    role: string().required(), // user or admin
    status: string().required(), // active, suspended или deactivated
    avatar: string().url().nullable(),
    createdOn: date().default(() => new Date()),
    updatedOn: date().default(() => new Date()),
});

export const recipeSchema = object({
    id: string().required(), // to 24
    userId: string().required(), // to 24
    name: string().required(), // to 80
    shortDescription: string().nullable(),
    description: string().required(),
    cookingTime: number().positive().required(),
    products: string().required(),
    picture: string().url(),
    createdOn: date().default(() => new Date()),
    updatedOn: date().default(() => new Date()),
});