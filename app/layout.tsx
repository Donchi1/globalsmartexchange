import type { Metadata } from "next";
import { Inter, Poppins } from 'next/font/google'

import "./globals.css";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"

};




const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: "200",
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-[#212529] bg-center bg-cover bg-no-repeat min-h-screen" style={{ backgroundImage: "url(/imgs/home_bg.jpg)" }}>

        {children}
        <div id="modal-root"></div>

      </body>

    </html>
  );
}
