import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import ProductForm from '@/app/(products)/components/product-form'
import { fetchProductByProductId } from '@/app/(products)/lib/action'

export default async function Page({
    params,
}: {
    params: { productId: string }
}) {
    const { userId } = auth()
    const data = await fetchProductByProductId(params.productId)

    if (!data) {
        notFound()
    }

    if (userId)
        return (
            <ProductForm
                editMode
                userId={userId}
                product={JSON.parse(JSON.stringify(data))}
            />
        )
}
