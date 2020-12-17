module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{css,html,ico,js,json,png,svg,webp,pdf,txt,xml}'],
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|svg|webp)$/,
      handler: 'CacheFirst',
      options: {
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365
        },
        cacheName: 'images'
      }
    },
    {
      urlPattern: /\.(?:pdf|txt|xml)$/,
      handler: 'CacheFirst',
      options: {
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 365
        },
        cacheName: 'secondary'
      }
    }
  ],
  swDest: 'build/sw.js'
};