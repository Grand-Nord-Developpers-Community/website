import crypto from "node:crypto";
globalThis.crypto ??= crypto.webcrypto;
// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Provide an (empty) turbopack config to opt into Turbopack defaults
  // while keeping an existing webpack override. This silences the
  // "webpack config with no turbopack config" error from Next.js.
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true, // Example option
            },
          },
        ],
        as: "*.js", // Specify output type if needed
      },
    },
  },
  webpack(config, { webpack }) {
    // Grab the existing rule that handles SVG imports
    // const fileLoaderRule = config.module.rules.find((rule) =>
    //   rule.test?.test?.(".svg")
    // );

    // config.module.rules.push(
    //   // Reapply the existing rule, but only for svg imports ending in ?url
    //   {
    //     ...fileLoaderRule,
    //     test: /\.svg$/i,
    //     resourceQuery: /url/, // *.svg?url
    //   },
    //   // Convert all other *.svg imports to React components
    //   {
    //     test: /\.svg$/i,
    //     issuer: fileLoaderRule.issuer,
    //     resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
    //     use: ["@svgr/webpack"],
    //   }
    // );

    // // Modify the file loader rule to ignore *.svg, since we have it handled now.
    // fileLoaderRule.exclude = /\.svg$/i;

    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },

  async redirects() {
    return [
      {
        source: "/user",
        destination: "/user/dashboard",
        permanent: true,
      },
      {
        source: "/account",
        destination: "/account/complete",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/admin/overview",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "bachdev.vercel.app",
      },
      {
        protocol: "https",
        hostname: "api.slingacademy.com",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
