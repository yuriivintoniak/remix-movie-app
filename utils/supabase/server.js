import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const createServerClient = (request) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: { Authorization: `Bearer ${request.headers.get("Authorization")}` },
    },
  });
  return supabase;
};
