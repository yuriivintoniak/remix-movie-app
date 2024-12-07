import { Form, useActionData } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "./SignupForm.css?url";

export default function SignupForm() {
  const { 
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.success) {
      alert(actionData.message);
    }
  }, [actionData]);

  return (
    <Form method="post" className="container">
      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        id="email"
        name="email"
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
        name="password"
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

      {actionData?.error && <p className="error-message mt-4 text-center">{actionData.error}</p>}
    </Form>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
