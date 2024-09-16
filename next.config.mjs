/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
    output: "export",
    typescript: {
      ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    trailingSlash: true,
    swcMinify: true,
    basePath: "",
    assetPrefix : "",
    images: {
      loader: "imgix",
      path: "/",
    },
};

export default nextConfig;
