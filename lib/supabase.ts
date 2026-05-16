import { createClient, SupabaseClient } from "@supabase/supabase-js";

// 1. Create a variable outside the function to store the single instance
let supabaseInstance: SupabaseClient | null = null;

export default function supabase() {
  // 2. Only initialize if it doesn't exist yet
  if (!supabaseInstance) {
    const supabase_url = process.env.SUPABASE_URL!;
    const supabase_service_key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    supabaseInstance = createClient(supabase_url, supabase_service_key);
  }

  // 3. Always return the same instance
  return supabaseInstance;
}
