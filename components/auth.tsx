import {
    SignedIn,
    SignedOut,
    SignUpButton,
    SignInButton,
    UserButton,
} from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

export default function Auth() {
    return (
        <>
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
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
