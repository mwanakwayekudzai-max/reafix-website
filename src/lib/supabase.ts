import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://fhshgsjslqeqgycykliu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoc2hnc2pzbHFlZ3lrbGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNDI3MjIsImV4cCI6MjEwNjkxODcyMn0.PAYoD9ivqwwS4fhIv98TMcs8ePuLkE8hg1wcRcpLVj8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
