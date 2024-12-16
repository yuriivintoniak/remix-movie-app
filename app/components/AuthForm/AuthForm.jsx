import { Form, Link, useActionData, useSubmit } from "@remix-run/react";
import { useForm } from "react-hook-form";
import styles from "./AuthForm.css?url";

export default function AuthForm({ mode }) {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const submit = useSubmit();
  const actionData = useActionData();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    submit(formData, { method: "post" });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container">
      <label htmlFor="name">Name</label>
      <input 
        type="text" 
        id="name"
        name="name"
        {...register("name", {
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters",
          },
        })}
        style={{ border: errors.name ? "2px solid #b22222" : "" }}
      />

      {errors.name && ( 
        <p className="error-message">{errors.name.message}</p>
      )}

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

      {errors.email && ( 
        <p className="error-message">{errors.email.message}</p>
      )}

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

      {errors.password && ( 
        <p className="error-message">{errors.password.message}</p>
      )}

      <button type="submit">{mode === "login" ? "Log In" : "Sign Up"}</button>

      <div className="auth-switch">
        {mode === "login" ? (
          <p>
            No account?{" "}
            <Link to={`/signup`} className="auth-link">
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link to={`/login`} className="auth-link">
              Log In
            </Link>
          </p>
        )}
      </div>

      {actionData?.error && ( 
        <p className="error-message mt-4 text-center">{actionData.error}</p>
      )}
    </Form>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
