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

  const metaPixelId = env.VITE_META_PIXEL_ID?.trim() || '731284423344135'
  const metaPixel = metaPixelId
    ? `<!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${metaPixelId}');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none" alt=""
    src="https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1" /></noscript>
    <!-- End Meta Pixel Code -->`
    : '<!-- Meta Pixel: set VITE_META_PIXEL_ID -->'

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
            .replace('__META_PIXEL__', metaPixel)
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
