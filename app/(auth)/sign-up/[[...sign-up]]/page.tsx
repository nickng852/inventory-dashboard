'use client'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { SignUp, ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import background from '@/public/background.jpg'

export default function Page() {
    const { resolvedTheme } = useTheme()

    return (
        <>
            <Image
                alt="background"
                src={background}
                className="h-screen w-full object-cover"
                priority
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <ClerkLoading>
                    <Loader2 className="animate-spin text-muted-foreground" />
                </ClerkLoading>

                <ClerkLoaded>
                    <SignUp
                        appearance={{
                            baseTheme:
                                resolvedTheme === 'dark' ? dark : undefined,
                        }}
                        routing="hash"
                    />
                </ClerkLoaded>
            </div>
        </>
    )
}
