import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
