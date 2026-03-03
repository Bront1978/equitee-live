import { createClient } from '@supabase/supabase-js';

// We use process.env to grab the secrets you just updated in GitHub
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase Environment Variables in GitHub Secrets");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
