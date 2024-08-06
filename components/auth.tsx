'use client'
import { useTheme } from 'next-themes'
import {
    SignedIn,
    SignedOut,
    SignUpButton,
    SignInButton,
    UserButton,
} from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { Button } from '@/components/ui/button'

export default function Auth() {
    const { resolvedTheme } = useTheme()

    return (
        <>
            <SignedIn>
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
                    }}
                    userProfileProps={{
                        appearance: {
                            baseTheme:
                                resolvedTheme === 'dark' ? dark : undefined,
                        },
                    }}
                    showName={true}
                />
            </SignedIn>
            <SignedOut>
                <div className="space-x-2">
                    <SignInButton>
                        <Button>Log In</Button>
                    </SignInButton>

                    <SignUpButton>
                        <Button variant="outline">Sign Up</Button>
                    </SignUpButton>
                </div>
            </SignedOut>
        </>
    )
}
