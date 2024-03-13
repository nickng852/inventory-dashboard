import { auth } from '@clerk/nextjs'

import OrderForm from '@/components/order-form'

export default function Page() {
    const { userId } = auth()

    if (userId)
        return (
            <main>
                <div className="flex flex-col items-center">
                    <OrderForm userId={userId} />
                </div>
            </main>
        )
}
