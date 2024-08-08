import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="w-full max-w-5xl space-y-6">
            <h1 className="text-xl font-bold">Product not found</h1>
            <p>Could not find the requested product.</p>
            <Button>
                <Link href="/products">Return to Products</Link>
            </Button>
        </div>
    )
}
