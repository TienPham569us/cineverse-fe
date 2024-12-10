import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //trailingSlash: true,
  /* config options here */
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      //config.devtool = 'cheap-module-source-map';
      config.module.rules.push({
        test: /\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      });
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.themoviedb.org",
        pathname: "/**",
        port: "",
      }
      
    ],
  },
};

export default nextConfig;
