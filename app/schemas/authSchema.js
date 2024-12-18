import * as yup from "yup";

export const authSchema = yup.object().shape({
  email: yup.string()
    .required("Email is required")
    .matches(
      /^[^@]+@[^@]+\.[^@]+$/,
      "Invalid email address"
    ),

  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});
