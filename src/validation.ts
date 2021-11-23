import * as yup from "yup";

const username = yup
  .string()
  .min(3)
  .max(20)
  .required("Username is required")
  .matches(
    /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
    "Username should be alphanumeric"
  );
const email = yup.string().email().required("Email is required");
const password = yup.string().min(3).required("Password is required");
const title = yup.string().min(1);
const bio = yup.string();
const website = yup
  .string()
  .matches(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
    "you should provide a valid url"
  );
const avatar = yup.string();
const message = yup.string().min(3).required("Message is required");

export const loginSchema = yup.object().shape({
  email,
  password,
});

export const registerSchema = yup.object().shape({
  username,
  email,
  password,
});

export const projectSchema = yup.object().shape({
  title,
});

export const profileSchema = yup.object().shape({
  bio,
  website,
  avatar,
});

export const commentSchema = yup.object().shape({
  message,
});
