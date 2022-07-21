import { createClient, SupabaseClient } from '@supabase/supabase-js';
//import { AsyncStorage } from 'react-native'

//const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
//const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

const supabaseUrl = 'https://xpiordhecqmaqsczvzgs.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaW9yZGhlY3FtYXFzY3p2emdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI1MDU1NzIsImV4cCI6MTk2ODA4MTU3Mn0.lj3qTl5s0DYt-6gckUkTWVDkVj2gGS6jhA6ykLEe4iw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
//const supabase = createClient(

const signUp = async (email, password) => {
  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { user, session, error };
};

const signIn = async (email, password) => {
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  });
  return { user, session, error };
};

const signOut = async (email, password) => {
  const { error } = await supabase.auth.signOut({
    email,
    password,
  });
  return { error };
};

const getUser = async () => {
  const user = supabase.auth.user();
  console.log(user);
};

const userData = async (age, gender) => {
  const { data, error } = await supabase
    .from('messages')
    .upsert({ id: 3, message: 'foo', username: 'supabot' });
  return { error };
};

const user = supabase.auth.user();

export { supabase, signUp, signIn, signOut, getUser, userData };
