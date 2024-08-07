'use client'
import { useTheme } from 'next-themes'
import { ClerkLoading, ClerkLoaded, UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { Skeleton } from '@/components/ui/skeleton'

export default function Auth() {
    const { resolvedTheme } = useTheme()

    return (
        <>
            <ClerkLoading>
                <Skeleton className="h-8 w-8 rounded-full" />
            </ClerkLoading>

            <ClerkLoaded>
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
                        elements: {
                            avatarBox: {
                                width: '2rem',
                                height: '2rem',
                            },
                        },
                    }}
                    userProfileProps={{
                        appearance: {
                            baseTheme:
                                resolvedTheme === 'dark' ? dark : undefined,
                        },
                    }}
                />
            </ClerkLoaded>
        </>
    )
}
