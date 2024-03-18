/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'kyrxwczgntdzbcamjivn.supabase.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_SUPABASE_URL,
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
