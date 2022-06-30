import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    email: Yup.string()
        .email("Invalid email")
        .required('Required'),
    username: Yup.string()
        .max(20, "Too Long!")
        .required("Required"),
    password: Yup.string()
        .min(5, "Too Short!")
        .required("Required"),
});

export const SignInSchema = Yup.object().shape({
    username: Yup.string()
        .max(20, "Too Long!")
        .required("Required"),
    password: Yup.string()
        .min(5, "Too Short!")
        .required("Required"),
});

export const RecipeSchema = Yup.object().shape({
    title: Yup.string()
        .min(5, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    description: Yup.string()
        .min(5, "Too Short!")
        .max(512, "Too Long!")
        .required("Required"),
    cookingTime: Yup.number()
        .positive("Cannot be number under zero")
        .required("Required"),
    tags: Yup.string(),
    level: Yup.string().required("Required"),
    steps: Yup.array()
        .of(
            Yup.object().shape({
                description: Yup
                    .string()
                    .max(1024, "Too Long!")
                    .required("Required"),
            })
        ).required("Required!"),
    ingredients: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup
                    .string()
                    .max(30, "Too Long!")
                    .required("Required"),
                quantity: Yup
                    .string()
                    .max(30, "Too Long!")
                    .required("Required"),
            })
        ).required("Required!"),
});

export const CommentSchema = Yup.object().shape({
    body: Yup.string()
        .min(5, "Too Short!")
        .max(256, "Too Long!")
        .required("Required"),
});