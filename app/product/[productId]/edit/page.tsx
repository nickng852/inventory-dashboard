import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { fetchProductByProductId } from '@/app/action'
import ProductForm from '@/components/product-form'

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
