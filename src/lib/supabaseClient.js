
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://snbxjvljqxaytomtdnvk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuYnhqdmxqcXhheXRvbXRkbnZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNjQ0MTIsImV4cCI6MjA2NDY0MDQxMn0.C59iWzSp4VDz6XUj8RQ65Dk-nqFLqkH_JrTie7ep2So';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
