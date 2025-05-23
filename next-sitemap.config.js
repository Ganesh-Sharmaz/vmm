/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://vmm-one.vercel.app', // change this to your domain
  generateRobotsTxt: true, // Generates robots.txt as well
  sitemapSize: 7000, // optional
  generateIndexSitemap: true,
  exclude: ['/admin/*'], // Exclude admin routes
  // Include all your dynamic routes
  additionalPaths: async (config) => {
    return [
      '/news',
      '/results',
      '/exams',
      '/homepage',
    ]
  },
};