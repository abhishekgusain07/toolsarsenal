/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'www.picyard.in',
            },
        ],
    },
};

export default nextConfig;
