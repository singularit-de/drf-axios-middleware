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
      {text: 'Changelogs', link: 'https://github.com/singularit-de/drf-axios-middleware/releases'},
      {text: 'Imprint', link: 'https://www.singular-it.de/impressum'},
    ],

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
    search: {
      provider: 'algolia',
      options: {
        appId: 'ON2RIH2H4Q',
        apiKey: '4db353c83a9c76fb04aea88371f6d1b0',
        indexName: 'drf-axios-middleware',
        locales: {
          de: {
            placeholder: 'Suchen',
            translations: {
              button: {
                buttonText: 'Suchen',
                buttonAriaLabel: 'Suchen',
              },
              modal: {
                searchBox: {
                  resetButtonTitle: 'Zurücksetzen',
                  resetButtonAriaLabel: 'Zurücksetzen',
                  cancelButtonText: 'Abbrechen',
                  cancelButtonAriaLabel: 'Abbrechen',
                },
                startScreen: {
                  recentSearchesTitle: 'Zuletzt gesucht',
                  noRecentSearchesText: 'Keine zuletzt gesuchten Begriffe',
                  saveRecentSearchButtonTitle: 'Zu den zuletzt gesuchten Begriffen hinzufügen',
                  removeRecentSearchButtonTitle: 'Zuletzt gesuchten Begriffe entfernen',
                  favoriteSearchesTitle: 'Favoriten',
                  removeFavoriteSearchButtonTitle: 'Favoriten entfernen',
                },
                errorScreen: {
                  titleText: 'Es ist ein Fehler aufgetreten',
                  helpText: 'Bitte versuche es später noch einmal',
                },
                footer: {
                  selectText: 'Auswählen',
                  navigateText: 'Navigieren',
                  closeText: 'Schließen',
                  searchByText: 'Suche von',
                },
                noResultsScreen: {
                  noResultsText: 'Keine Ergebnisse gefunden für',
                  suggestedQueryText: 'Meintest du',
                  reportMissingResultsText: 'Fehlende Ergebnisse melden',
                  reportMissingResultsLinkText: 'Melden',
                },
              },
            },
          },
        },
      },
    },
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
          {text: 'Changelogs', link: 'https://github.com/singularit-de/drf-axios-middleware/releases'},
          {text: 'Impressum', link: 'https://www.singular-it.de/impressum'},
        ],
        docFooter: {
          prev: 'Vorherige Seite',
          next: 'Nächste Seite',
        },
        outline: {
          label: 'Auf dieser Seite',
        },

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
