/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '2exp9xlz6q4hxqhm.public.blob.vercel-storage.com',
            },
        ],
    },
}

export default nextConfig
