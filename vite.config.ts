import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const apiPort = process.env.API_PORT ?? '3001'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || env.SITE_URL || '').replace(/\/$/, '')

  const ogImage = siteUrl ? `${siteUrl}/og.png` : '/og.png'
  const canonical = siteUrl
    ? `<link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />`
    : '<!-- Set VITE_SITE_URL when your domain is purchased for canonical & og:url -->'

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-seo-inject',
        transformIndexHtml(html) {
          return html
            .replaceAll('__OG_IMAGE__', ogImage)
            .replace('__CANONICAL__', canonical)
        },
      },
    ],
    server: {
      proxy: {
        '/api': `http://localhost:${apiPort}`,
        '/robots.txt': `http://localhost:${apiPort}`,
        '/sitemap.xml': `http://localhost:${apiPort}`,
      },
    },
  }
})
