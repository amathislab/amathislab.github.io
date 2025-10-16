/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Set to empty string for root domain deployment (username.github.io)
// Set to repo name for project page deployment (username.github.io/repo-name)
const repoName = process.env.NEXT_PUBLIC_REPO_NAME || '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
  // Only add basePath/assetPrefix if deploying to a project page (not root domain)
  basePath: isProd && repoName ? `/${repoName}` : '',
  assetPrefix: isProd && repoName ? `/${repoName}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
