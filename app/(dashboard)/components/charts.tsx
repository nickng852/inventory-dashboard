import { fetchOrdersByDate } from '@/app/(dashboard)/(orders)/lib/action'
import TotalOrdersChart from '@/components/total-orders-chart'
import TotalRevenueChart from '@/components/total-revenue-chart'

type Props = {
    userId: string
    from: string
    to: string
}

export default async function ChartWrapper({ userId, from, to }: Props) {
    const orders = await fetchOrdersByDate(userId, from, to)

    const formattedOrders = orders.map((order) => ({
        ...order,
        _sum: { grandTotal: Number(order._sum.grandTotal) || 0 },
    }))

    return (
        <>
            <TotalRevenueChart data={formattedOrders} />

            <TotalOrdersChart data={formattedOrders} />
        </>
    )
}
