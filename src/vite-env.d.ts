/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_BFF: string;
  readonly VITE_API_URL_ACCOUNTS: string;
  readonly VITE_API_URL_INSTITUTIONS: string;
  readonly VITE_SUPABASE_DB_PASSWORD: string;
  readonly VITE_SUPABASE_PROJECT_NAME: string;
  readonly VITE_SUPABASE_PROJECT_ID: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_API_KEY: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
