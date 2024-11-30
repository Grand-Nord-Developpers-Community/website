/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/user',
        destination: '/user/dashboard',
        permanent: true,
      },
      {
        source: '/account',
        destination: '/account/complete',
        permanent: true,
      },
      
    ]
  },
};
// next.config.js
 
  
export default nextConfig;
