import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import { PlusIcon } from '@radix-ui/react-icons'

import ProductList from '@/app/(products)/components/product-list'
import { Button } from '@/components/ui/button'

export default function Home() {
    const { userId } = auth()

    if (userId)
        return (
            <main className="h-full flex-1 flex-col items-center md:flex">
                <div className="w-full max-w-4xl space-y-6 md:space-y-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                                Products
                            </h2>
                            <p className="text-muted-foreground">
                                Here&apos;s a list of your products.
                            </p>
                        </div>

                        <Link href="/products/create">
                            <Button className="w-full">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add Product
                            </Button>
                        </Link>
                    </div>

                    <ProductList userId={userId} />
                </div>
            </main>
        )
}
