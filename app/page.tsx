import { auth } from '@clerk/nextjs'
import { ReaderIcon, CubeIcon } from '@radix-ui/react-icons'

import { fetchOrdersByUserId } from '@/app/(orders)/lib/action'
import { fetchProductsByUserId } from '@/app/(products)/lib/action'
import Chart from '@/components/chart'
import OverviewCard from '@/components/overview-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Home() {
    const { userId } = auth()
    const products = await fetchProductsByUserId(userId ?? '')
    const orders = await fetchOrdersByUserId(userId ?? '')

    const formattedOrders = orders.map((order) => {
        return {
            ...order,
            grandTotal: Number(order.grandTotal),
        }
    })

    const totalRevenue = orders.reduce((acc, cV) => {
        return (acc += Number(cV.grandTotal))
    }, 0)

    if (userId)
        return (
            <main className="h-full flex-1 flex-col items-center md:flex">
                <div className="w-full max-w-4xl space-y-6 md:space-y-8">
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
                            data={orders.length}
                        />
                        <OverviewCard
                            type="number"
                            cardTitle="Products"
                            cardIcon={<CubeIcon />}
                            data={products.length}
                        />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Chart data={formattedOrders} />
                        </CardContent>
                    </Card>
                </div>
            </main>
        )
}
