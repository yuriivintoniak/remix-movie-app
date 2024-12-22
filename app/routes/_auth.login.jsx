import { json, redirect } from "@remix-run/node";
import { supabase } from "../../utils/supabase/client";
import { cookie } from "../../utils/supabase/cookies";
import AuthForm from "../components/AuthForm/AuthForm";
import { links as authFormLinks } from "../components/AuthForm/AuthForm";

export default function Login() {
  return <AuthForm mode="login" />;
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return json({ error: "Email and password are required" }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return json({ success: false, error: error.message }, { status: 400 });
  }

  const session = data.session;
  const cookieHeader = await cookie.serialize(session);

  return redirect("/", { headers: { "Set-Cookie": cookieHeader } });
};

export const links = () => {
  return [...authFormLinks()];
};
