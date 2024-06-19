/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "157.90.153.84",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
