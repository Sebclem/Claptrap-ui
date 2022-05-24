/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_OAUTH_REDIRECT_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_DISCORD_USER_AVATAR_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
