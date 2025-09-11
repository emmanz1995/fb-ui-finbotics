/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_BFF: string;
  readonly VITE_API_URL_ACCOUNTS: string;
  readonly VITE_API_URL_INSTITUTIONS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
