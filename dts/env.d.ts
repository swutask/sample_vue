/// <reference types="vite/client" />

/* UPDATE DEPENDING ON YOUR PROJRCT NEEDS */

interface ImportMetaEnv {
  readonly VITE_APP_API: string
  readonly VITE_APP_WEBSOCKET: string
  readonly VITE_APP_AWS_BUCKET: string
  readonly VITE_APP_STRIPE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}