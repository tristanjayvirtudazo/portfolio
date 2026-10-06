import { createApp, createSSRApp } from 'vue'
import App from './App.vue'

/** `hydrate` reuses the pre-rendered HTML from the build instead of re-rendering it. */
export function createPortfolioApp({ hydrate }: { hydrate: boolean }) {
  return hydrate ? createSSRApp(App) : createApp(App)
}
