/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    FIREBASE_KEY: process.env.FIREBASE_KEY,
    API_REQUEST_URL: process.env.API_REQUEST_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY
  },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
               
              },
          {
            protocol: 'https',
            hostname:'randomuser.me'
              
          },
        ]
      }
};

export default nextConfig;
