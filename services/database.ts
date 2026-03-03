import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// This is the main connection your bot uses to talk to your database
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
