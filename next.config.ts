import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Los pronombres se movieron dentro de A1.
      { source: "/pronombres", destination: "/a1/pronombres", permanent: false },
      {
        source: "/pronombres/:path*",
        destination: "/a1/pronombres/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
