import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient;

// Check if the environment variables are provided
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // If the variables are not found, log a warning and use a mock client
  // This allows the application to build, but functionality will be disabled.
  console.warn(
    'Supabase environment variables not found. Using a mock client for the build process. Please create a .env.local file with your Supabase credentials for full functionality.'
  );

  // Define a mock client with a structure that satisfies TypeScript
  const mockSupabase = {
    auth: {
      signUp: () => {
        throw new Error('Supabase is not configured. Please check your .env.local file.');
      },
      // You can add mock implementations for other methods if needed for the build
    },
    from: (table: string) => ({
      select: () => {
        console.warn(`Mocked Supabase call to select from ${table}`);
        return Promise.resolve({ data: [], error: null });
      },
      // Add other chained methods if your app uses them at a top level
    }),
    // Add other top-level properties of the Supabase client if needed
  };

  // Type assertion to make TypeScript happy
  supabase = mockSupabase as unknown as SupabaseClient;
}

export { supabase };
