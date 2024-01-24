import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/themeProvider'
import { Toaster } from '@/components/ui/sonner'


export const metadata: Metadata = {
  title: {
    template: "CRM | %s",
    default: "CRM"
  },
  description: 'Client Relation Management',
}
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          forcedTheme='dark'
          storageKey='initial_theme'
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
