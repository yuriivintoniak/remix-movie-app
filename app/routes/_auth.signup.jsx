import { json, redirect } from "@remix-run/node";
import { supabase } from "../../supabase";
import AuthForm from "../components/AuthForm/AuthForm";
import { links as authFormLinks} from "../components/AuthForm/AuthForm";

export default function Signup() {
  return <AuthForm mode="signup" />;
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return json({ error: "Email and password are required" }, { status: 400 });
  }

  const { error } = await supabase.auth.signUp({
    name: name,
    email: email,
    password: password,
  });

  if (error) {
    return json({ success: false, error: error.message }, { status: 400 });
  }

  return redirect("/");
};

export const links = () => {
  return [...authFormLinks()];
};
