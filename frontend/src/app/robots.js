export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'],
    },
    sitemap: 'https://ln-pathlogy.vercel.app/sitemap.xml',
  }
}
