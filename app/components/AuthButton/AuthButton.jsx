import { Form, Link } from "@remix-run/react";
import styles from "./AuthButton.css?url";

export default function AuthButton({ session }) {
  return (
    <div>
      {session ? (
        <Form method="post" action="/logout">
          <button type="submit" className="auth">
            Log Out
          </button>
        </Form>
      ) : (
        <Link to={`/login`} className="auth">
          Log In
        </Link>
      )}
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
