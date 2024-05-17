/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["xarwas4csfe8g80s.public.blob.vercel-storage.com"]
    },
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
    }
};

export default nextConfig;
