import SignupForm from "../components/SignupForm/SignupForm";
import { links as signupFormLinks} from "../components/SignupForm/SignupForm";
import { json, redirect } from "@remix-run/node";
import { supabase } from "../../supabase";

export default function Signup() {
  return <SignupForm />;
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return json({ error: "Email and password are required" }, { status: 400 });
  }

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return json({ success: false, error: error.message }, { status: 400 });
  }

  return redirect("/");
};

export const links = () => {
  return [...signupFormLinks()];
};
