/** @type {import('next').NextConfig} */
const nextConfig = {    
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storagenordsol.blob.core.windows.net',
                pathname: '/**',
            }
        ],
    },
    experimental: {
        serverActions: true,
    },
};

export default nextConfig;
