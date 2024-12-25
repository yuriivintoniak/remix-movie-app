import { json, redirect } from "@remix-run/node";
import { cookie } from "../../utils/supabase/cookies";
import { createServerClient } from "../../utils/supabase/server";

export default function Logout() {
  return null;
}

export const action = async ({ request }) => {
  const supabase = createServerClient(request);

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    return json({ error: "Logout failed." }, { status: 500 });
  }

  const cookieHeader = await cookie.serialize("", { maxAge: 0 });
  return redirect("/login", { headers: { "Set-Cookie": cookieHeader } });
};
