import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    username: Yup.string().max(15, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, "Too short!").required("Required"),
    avatar: Yup.string().url().required("Please enter avatar url"),
    description: Yup.string().max(512, "Too long!"),
});

export const SignInSchema = Yup.object().shape({
    username: Yup.string(),
    password: Yup.string(),
});

export const CreateRecipeSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(80, 'Too Long!').required('Required'),
    shortDescription: Yup.string().max(256, "Too long!"),
    timeToCooking: Yup.number().positive().required(),
    products: Yup.string().required(),
    result: Yup.string().url().required("Please enter url"),
    description: Yup.string().max(2048, "Too long!"),
});