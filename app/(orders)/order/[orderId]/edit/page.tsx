import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import OrderForm from '@/app/(orders)/components/order-form'
import { fetchOrderByOrderId } from '@/app/(orders)/lib/action'
import { fetchProductsByUserId } from '@/app/(products)/lib/action'

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
