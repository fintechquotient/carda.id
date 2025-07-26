import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata = {
  title: "Raunak Dembla - Smart Contact Card",
  description: "Connect with Raunak Dembla - Founding Member at Decentro, Host of Fintech Quotient Podcast",
  keywords: "Raunak Dembla, Decentro, Fintech, Contact Card, Bangalore",
  author: "Raunak Dembla",
  viewport: "width=device-width, initial-scale=1",
  ogTitle: "Raunak Dembla - Smart Contact Card",
  ogDescription: "Connect with Raunak Dembla - Founding Member at Decentro",
  ogImage: "/profile-photo.jpg",
  ogUrl: "https://your-vercel-url.vercel.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body className={manrope.className}>{children}</body>
    </html>
  )
}