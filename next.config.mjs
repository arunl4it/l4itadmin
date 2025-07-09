/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['l4it.net'],  
        remotePatterns: [
          {
            protocol: 'http',  
            hostname: 'l4it.net',
            port: '8000',
            pathname: '/static/uploads/**',  
          },
        ],
      },
};

export default nextConfig;
