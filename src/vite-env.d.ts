/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
