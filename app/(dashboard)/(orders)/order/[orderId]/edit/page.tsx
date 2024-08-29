import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import OrderForm from '@/app/(dashboard)/(orders)/components/order-form'
import { fetchOrderByOrderId } from '@/app/(dashboard)/(orders)/lib/action'
import { fetchProductsByUserId } from '@/app/(dashboard)/(products)/lib/action'

export default async function Page({
    params,
}: {
    params: { orderId: string }
}) {
    const { userId } = auth()
    const order = await fetchOrderByOrderId(params.orderId)
    const products = await fetchProductsByUserId(userId as string)

    if (!order) {
        notFound()
    }

    return (
        <OrderForm
            editMode
            order={JSON.parse(JSON.stringify(order))}
            products={JSON.parse(JSON.stringify(products))}
        />
    )
}
