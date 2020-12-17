module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{css,html,ico,js,json}'],
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|svg|webp)$/,
      handler: 'CacheFirst',
      options: { cacheName: 'images' }
    },
    {
      urlPattern: /\.(?:pdf|txt|xml)$/,
      handler: 'CacheFirst',
      options: { cacheName: 'secondary' }
    }
  ],
  swDest: 'build/sw.js',
};