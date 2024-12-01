import { Form } from "@remix-run/react";
import styles from "./SignupForm.css?url";

export default function SignupForm() {
  return (
    <Form method="post" className="container">
      <label htmlFor="email">Email</label>
      <input 
        type="email" id="email" name="email" autoComplete="off" required
      />
      <span htmlFor="password">Password</span>
      <input 
        type="password" id="password" name="password" autoComplete="off" required
      />
      <button type="submit">Sign Up</button>
    </Form>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
