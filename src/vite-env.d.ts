/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOPIFY_STORE_DOMAIN: string
  readonly VITE_SHOPIFY_STOREFRONT_TOKEN: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  readonly VITE_META_PIXEL_ID: string
  readonly VITE_MAKE_WEBHOOK_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  google: any;
  fbq: (action: string, event: string, params?: any) => void;
}
