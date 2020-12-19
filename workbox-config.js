module.exports = {
  globDirectory: "build/",
  globPatterns: [
    "**/*.{xml,ico,png,svg,webp,html,json,pdf,txt}"
  ],
  swDest: "build/sw.js",
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|svg|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 60,
          maxEntries: 99
        }
      }
    },
    {
      urlPattern: /\.(?:pdf|txt|xml)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'secondary',
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 60,
          maxEntries: 99
        }
      }
    }
  ],
};