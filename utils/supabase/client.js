import { createBrowserClient } from "@supabase/auth-helpers-remix";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
