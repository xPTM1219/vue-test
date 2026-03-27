/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

export interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}