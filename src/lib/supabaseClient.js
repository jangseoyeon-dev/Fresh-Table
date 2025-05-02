import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kybodxhoqqupueyseeuy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5Ym9keGhvcXF1cHVleXNlZXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4OTgyNDcsImV4cCI6MjA2MTQ3NDI0N30.WHdeUJhSiF2AXxBzYqtTrF6G2aYyPHJtEzQt-n_lilc";

export const supabase = createClient(supabaseUrl, supabaseKey);
