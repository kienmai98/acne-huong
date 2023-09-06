import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/index.css'
import { siteConfig } from 'config/site'
import { Old_Standard_TT } from 'next/font/google'
import { cn } from 'libs'
import AuthProvider from 'contexts/auth'

const oldStandardTT = Old_Standard_TT({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  authors: [
    {
      name: 'acnehuong',
    },
  ],
  creator: 'kienmai',
  title: 'Home | Acne Huong',
  description: siteConfig.description,
  keywords: ['Acnehuong'],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={cn(
        'bg-light text-slate-800 antialiased',
        oldStandardTT.className,
      )}
      lang="en"
    >
      <head />
      <body className="min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2346085669058627"
        crossOrigin="anonymous"
      />
    </html>
  )
}
