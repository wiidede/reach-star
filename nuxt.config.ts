import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    'arco-design-nuxt-module',
    'nuxt-lodash',
    '@nuxtjs/i18n',
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  components: [
    {
      path: '~/components',
      extensions: ['.vue', '.tsx'],
    },
  ],

  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/main.css',
    'v-calendar/style.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/app/**': { ssr: false },
    '/*/app/**': { ssr: false },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/reach-star.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,

  i18n: {
    langDir: 'locales/',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.yml' },
      { code: 'zh', iso: 'zh-CN', file: 'zh.yml' },
    ],
    defaultLocale: 'en',
  },

  lodash: {
    prefix: '_',
    upperAfterPrefix: false,
  },

  devtools: {
    enabled: true,
  },
})
