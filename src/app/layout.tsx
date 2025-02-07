import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import "./globals.css"
import { pressStart2P } from "@/ui/fonts"
import Providers from "./SessionProvider"
import Loader from "@/components/Loader"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://nostalbit.idark.link"),
  other: {
    "google-site-verification": "GvZrEaxOoB22CbsYx79PO5SOnAE54o-oXrwnca3YncI",
  },
  title: "Nostalbit",
  description: "Retro Web Emulator",
  keywords: [
    "retro",
    "emulator",
    "web",
    "games",
    "online",
    "classic",
    "console",
    "NES",
    "SNES",
    "GameBoy",
    "Sega",
    "Genesis",
    "nostalgia",
    "gaming",
    "8bit",
    "16bit",
    "Nintendo",
    "handheld",
    "vintage",
    "oldschool",
    "retrogaming",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Nostalbit",
    description: "Retro Web Emulator",
    url: "/",
    siteName: "Nostalbit",
    images: [
      {
        url: "/web-preview.jpeg",
        width: 1200,
        height: 723,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    site: "/",
    card: "summary_large_image",
    title: "Nostalbit",
    description: "Retro Web Emulator",
    images: ["/web-preview.jpeg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${pressStart2P.className} ${geistSans.variable} ${geistMono.variable} antialiased tracking-wider text-white overflow-x-hidden min-h-screen`}>
          <Providers>
            <div className="lg:flex flex-col min-h-screen hidden">{children}</div>
            <div className="crtBackground z-49"></div>
            <div className="crtScanline z-49"></div>
          </Providers>
        <div className="flex flex-col bg-black fixed w-dvw h-full top-0 right-0 z-[500] lg:hidden items-center justify-center">
          <span className="max-w-40 text-center">
            THIS APP IS NOT AVAILABLE ON MOBILE
          </span>
          <span className="max-w-40 text-center mt-8">:(</span>
        </div>
        <Loader />
      </body>
    </html>
  )
}
