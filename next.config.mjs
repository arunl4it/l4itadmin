/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['ai.l4it.net'],  
        remotePatterns: [
          {
            protocol: 'http',  
            hostname: 'ai.l4it.net',
            port: '8000',
            pathname: '/static/uploads/**',  
          },
        ],
      },
};

export default nextConfig;
