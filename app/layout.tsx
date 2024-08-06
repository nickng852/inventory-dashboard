import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

import Navbar from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Inventory Dashboard',
    description:
        'Efficient inventory management system for tracking and organizing your stock',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { userId } = auth()

    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                            {userId && (
                                <div className="w-full flex-none md:w-64 md:border-r">
                                    <Sidebar className="hidden md:block" />
                                </div>
                            )}

                            <div className="flex-grow md:overflow-y-auto">
                                <Navbar />
                                <div className="p-4 md:p-10">{children}</div>
                            </div>
                        </div>
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
