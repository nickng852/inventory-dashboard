import { auth } from '@clerk/nextjs/server'

import OrderForm from '@/app/(dashboard)/(orders)/components/order-form'
import { fetchProductsByUserId } from '@/app/(dashboard)/(products)/lib/action'

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
