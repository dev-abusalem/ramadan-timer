import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get these values from your Supabase project settings
const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  "https://xpowlgutxfwkdgghesfy.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwb3dsZ3V0eGZ3a2RnZ2hlc2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NDYwOTksImV4cCI6MjA1ODMyMjA5OX0.sC0ayMNsovuwPbxH2T64kh3rbvU60xlWi5pQX-srBwM";

// Create the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
