/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'xarwas4csfe8g80s.public.blob.vercel-storage.com',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
