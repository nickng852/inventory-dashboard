import { notFound } from 'next/navigation'

import ProductForm from '@/app/(dashboard)/(products)/components/product-form'
import { fetchProductByProductId } from '@/app/(dashboard)/(products)/lib/action'

export default async function Page({
    params,
}: {
    params: { productId: string }
}) {
    const data = await fetchProductByProductId(params.productId)

    if (!data) {
        notFound()
    }

    return <ProductForm editMode product={JSON.parse(JSON.stringify(data))} />
}
