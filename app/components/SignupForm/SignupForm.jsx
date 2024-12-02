import { Form } from "@remix-run/react";
import { useForm } from "react-hook-form";
import styles from "./SignupForm.css?url";

export default function SignupForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => console.log(data);

  return (
    <Form method="post" onSubmit={handleSubmit(onSubmit)} className="container">
      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        id="email" 
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^@]+@[^@]+\.[^@]+$/,
            message: "Invalid email address",
          },
        })}
        style={{ border: errors.email ? "2px solid #b22222" : "" }}
      />

      {errors.email && <p className="error-message">{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input 
        type="password" 
        id="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 6 characters",
          },
        })}
        style={{ border: errors.password ? "2px solid #b22222" : "" }}
      />

      {errors.password && <p className="error-message">{errors.password.message}</p>}

      <button type="submit">Sign Up</button>
    </Form>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
