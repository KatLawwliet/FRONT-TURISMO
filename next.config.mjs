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
            }
        ],
    },
};

export default nextConfig;
