import { ReaderIcon, CubeIcon } from '@radix-ui/react-icons'

import { fetchCardData } from '@/app/(dashboard)/lib/action'
import OverviewCard from '@/components/overview-card'

type Props = {
    userId: string
    from: string
    to: string
}

export default async function CardWrapper({ userId, from, to }: Props) {
    const { totalProducts, totalOrders, totalRevenue } = await fetchCardData(
        userId,
        from,
        to
    )

    return (
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
                data={totalProducts}
            />
        </div>
    )
}
