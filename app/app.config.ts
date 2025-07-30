export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',
    }
  },

  head: {
    // Icons Files Generated with https://realfavicongenerator.net
    link: [
      // Basic favicon
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Standard sizes
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      // Apple devices
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      // Android devices  
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/web-app-manifest-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/web-app-manifest-512x512.png' },
      // Web App Manifest
      { rel: 'manifest', href: '/site.webmanifest' }
    ],
    meta: [
      // Theme colors for mobile browsers
      { name: 'theme-color', content: '#000000' },
      { name: 'msapplication-TileColor', content: '#000000' }
    ]
  }
})