import { auth } from '@clerk/nextjs'

import ProductForm from '@/components/product-form'

export default function Page() {
    const { userId } = auth()

    if (userId)
        return (
            <main>
                <div className="flex flex-col items-center">
                    <ProductForm userId={userId} />
                </div>
            </main>
        )
}
