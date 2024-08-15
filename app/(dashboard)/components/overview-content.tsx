import { Prisma } from '@prisma/client'
import { ReaderIcon, CubeIcon } from '@radix-ui/react-icons'

import { Product } from '@/app/(dashboard)/(products)/lib/type'
import OverviewCard from '@/components/overview-card'
import TotalOrdersChart from '@/components/total-orders-chart'
import TotalRevenueChart from '@/components/total-revenue-chart'

type Props = {
    products: Product[]
    orders: {
        _sum: {
            grandTotal: Prisma.Decimal | null
        }
        _count: number
        orderDate: Date
    }[]
}

export default async function OverViewContent({ products, orders }: Props) {
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

    return (
        <>
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
        </>
    )
}
