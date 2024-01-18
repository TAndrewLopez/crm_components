import type { Metadata } from 'next'
import './globals.css'
import { inter } from '../fonts'

import { ThemeProvider } from '@/components/themeProvider'


export const metadata: Metadata = {
  title: {
    template: "CRM | %s",
    default: "CRM"
  },
  description: 'Client Relation Management',
}

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
        </ThemeProvider>
      </body>
    </html>
  )
}
