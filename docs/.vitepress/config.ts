import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'DRF Axios Middleware',
  description: 'A VitePress Site',
  base: '/drf-axios-middleware/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Docs', link: '/get-started'},
      {text: 'Imprint', link: 'https://www.singular-it.de/impressum'},
    ],

    docFooter: {
      prev: 'Vorherige Seite',
      next: 'Nächste Seite',
    },

    sidebar: [
      {
        text: 'Guide',
        items: [
          {text: 'Get Started', link: '/get-started'},
          {text: 'Configuration', link: '/configuration'},
        ],
      },
      {
        text: 'Examples',
        items: [
          {text: 'Basic', link: '/example-basic'},
          {text: 'Nested Fields', link: '/example-nested-fields'},
          {text: 'Customization', link: '/example-customization'},
        ],
      },
      {
        text: 'Advanced',
        items: [
          {text: 'convertFilterSetConfig', link: '/convert-filter-set-config'},
        ],
      },
    ],
    socialLinks: [
      {icon: 'github', link: 'https://github.com/singularit-de/drf-axios-middleware'},
    ],
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    de: {
      label: 'German',
      lang: 'de',
      themeConfig: {
        nav: [
          {text: 'Start', link: '/de'},
          {text: 'Doku', link: '/de/get-started'},
          {text: 'Impressum', link: 'https://www.singular-it.de/impressum'},
        ],

        sidebar: [
          {
            text: 'Guide',
            items: [
              {text: 'Loslegen', link: '/de/get-started'},
              {text: 'Konfiguration', link: '/de/configuration'},
            ],
          },
          {
            text: 'Beispiele',
            items: [
              {text: 'Basis', link: '/de/example-basic'},
              {text: 'Nested Felder', link: '/de/example-nested-fields'},
              {text: 'Personalisieren', link: '/de/example-customization'},
            ],
          },
          {
            text: 'Fortgeschritten',
            items: [
              {text: 'convertFilterSetConfig', link: '/de/convert-filter-set-config'},
            ],
          },
        ],
        socialLinks: [
          {icon: 'github', link: 'https://github.com/singularit-de/drf-axios-middleware'},
        ],
      },
    },
  },
})
