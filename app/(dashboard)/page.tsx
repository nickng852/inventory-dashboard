import { sub } from 'date-fns'
import { auth } from '@clerk/nextjs/server'

import { fetchOrdersByDate } from '@/app/(dashboard)/(orders)/lib/action'
import { fetchProductsByDate } from '@/app/(dashboard)/(products)/lib/action'
import { CalendarDateRangePicker } from '@/components/date-range-picker'
import { formatDate } from '@/lib/utils'

import OverViewContent from './components/overview-content'

type Props = {
    searchParams?: {
        from: string
        to: string
    }
}

export default async function Home({ searchParams }: Props) {
    const { userId } = auth()

    const from = searchParams?.from ?? formatDate(sub(new Date(), { days: 30 }))
    const to = searchParams?.to ?? formatDate(new Date())

    const products = await fetchProductsByDate(userId ?? '', from, to)
    const orders = await fetchOrdersByDate(userId ?? '', from, to)

    return (
        <main className="h-full flex-1 flex-col items-center md:flex">
            <div className="w-full max-w-5xl space-y-6 md:space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Overview
                    </h2>

                    <CalendarDateRangePicker />
                </div>

                <OverViewContent products={products} orders={orders} />
            </div>
        </main>
    )
}
