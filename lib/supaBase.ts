import { createClient } from "@supabase/supabase-js";

export default function SupaBase(){
      const supabase_url: any = process.env.SUPABASE_URL;
      const supabase_service_key: any = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const client = createClient(supabase_url, supabase_service_key);
      return client
}