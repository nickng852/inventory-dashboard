import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import OrderForm from '@/app/orders/components/order-form'
import { fetchOrderByOrderId } from '@/lib/orders/action'
import { fetchProductsByUserId } from '@/lib/products/action'

export default async function Page({
    params,
}: {
    params: { orderId: string }
}) {
    const { userId } = auth()
    const order = await fetchOrderByOrderId(params.orderId)
    const products = await fetchProductsByUserId(userId ?? '')

    if (!order) {
        notFound()
    }

    if (userId)
        return (
            <OrderForm
                editMode
                userId={userId}
                order={JSON.parse(JSON.stringify(order))}
                products={JSON.parse(JSON.stringify(products))}
            />
        )
}
