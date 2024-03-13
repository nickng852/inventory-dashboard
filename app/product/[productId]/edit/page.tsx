import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import ProductForm from '@/components/product-form'
import { fetchProductByProductId } from '@/lib/products/action'

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
                data={JSON.parse(JSON.stringify(data))}
            />
        )
}
