import { createServerClient } from "@supabase/auth-helpers-remix";

export const getServerSupabase = (request, context) => {
  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    { request, context }
  );
};
