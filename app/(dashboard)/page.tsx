import { auth } from '@clerk/nextjs/server'
import { ReaderIcon, CubeIcon } from '@radix-ui/react-icons'

import { fetchSummedOrdersByUserId } from '@/app/(dashboard)/(orders)/lib/action'
import { fetchProductsByUserId } from '@/app/(dashboard)/(products)/lib/action'
import OverviewCard from '@/components/overview-card'
import TotalOrdersChart from '@/components/total-orders-chart'
import TotalRevenueChart from '@/components/total-revenue-chart'

export default async function Home() {
    const { userId } = auth()
    const products = await fetchProductsByUserId(userId ?? '')
    const orders = await fetchSummedOrdersByUserId(userId ?? '')

    const totalRevenue = orders.reduce((acc, cV) => {
        return acc + (Number(cV._sum.grandTotal) || 0)
    }, 0)

    const totalOrders = orders.reduce((acc, cV) => {
        return acc + cV._count
    }, 0)

    const formattedOrders = orders.map((order) => ({
        ...order,
        _sum: { grandTotal: Number(order._sum.grandTotal) || 0 },
    }))

    if (userId)
        return (
            <main className="h-full flex-1 flex-col items-center md:flex">
                <div className="w-full max-w-5xl space-y-6 md:space-y-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Overview
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <OverviewCard
                            type="dollar"
                            cardTitle="Total Revenue"
                            cardIcon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            }
                            data={totalRevenue}
                            prefix="$"
                        />
                        <OverviewCard
                            type="number"
                            cardTitle="Orders"
                            cardIcon={<ReaderIcon />}
                            data={totalOrders}
                        />
                        <OverviewCard
                            type="number"
                            cardTitle="Products"
                            cardIcon={<CubeIcon />}
                            data={products.length}
                        />
                    </div>

                    <TotalRevenueChart data={formattedOrders} />

                    <TotalOrdersChart data={formattedOrders} />
                </div>
            </main>
        )
}
