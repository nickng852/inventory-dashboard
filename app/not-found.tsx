import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <section className="flex flex-col items-center">
            <div className="w-full max-w-4xl space-y-6">
                <h1 className="text-xl font-bold">Page not found</h1>
                <p>Could not find the requested page.</p>
                <Button>
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        </section>
    )
}
