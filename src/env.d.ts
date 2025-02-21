interface ImportMetaEnv {
  readonly PUBLIC_DIRECTUS_URL: string;
  readonly PUBLIC_PLAUSIBLE_URL: string;
  readonly PUBLIC_PLAUSIBLE_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __APP_VERSION__: string