import { auth } from '@clerk/nextjs'

import OrderForm from '@/app/orders/components/order-form'
import { fetchProductsByUserId } from '@/lib/products/action'

export default async function Page() {
    const { userId } = auth()
    const data = await fetchProductsByUserId(userId ?? '')

    if (userId)
        return (
            <main>
                <div className="flex flex-col items-center">
                    <OrderForm
                        userId={userId}
                        products={JSON.parse(JSON.stringify(data))}
                    />
                </div>
            </main>
        )
}
