module.exports = {
  cacheId: 'leodeslfCache',
  globDirectory: 'build/',
  globPatterns: [
    '**/*.{css,html,ico,js,json,png,svg,webp,pdf,txt,xml}'
  ],
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|svg|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 180
        }
      }
    },
    {
      urlPattern: /\.(?:pdf|txt|xml)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'secondary',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 180
        }
      }
    }
  ],
  swDest: 'build/sw.js'
};