// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.flexpost.xyz'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Block specific paths if needed
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}