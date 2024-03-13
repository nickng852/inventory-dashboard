'use client'
import { useTheme } from 'next-themes'
import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
    const { resolvedTheme } = useTheme()

    return (
        <div className="flex flex-col items-center">
            <SignIn
                appearance={{
                    baseTheme: resolvedTheme === 'dark' ? dark : undefined,
                    elements: {
                        formButtonPrimary:
                            'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                    },
                    variables: {
                        colorPrimary: '#71717a',
                    },
                }}
            />
        </div>
    )
}
