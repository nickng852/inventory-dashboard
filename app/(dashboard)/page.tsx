import { Suspense } from 'react'
import { sub } from 'date-fns'
import { auth } from '@clerk/nextjs/server'

import CardWrapper from '@/app/(dashboard)/components/cards'
import ChartWrapper from '@/app/(dashboard)/components/charts'
import {
    CardsSkeleton,
    ChartsSkeleton,
} from '@/app/(dashboard)/components/skeletons'
import { CalendarDateRangePicker } from '@/components/date-range-picker'
import { formatDate } from '@/lib/utils'

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

    return (
        <main className="h-full flex-1 flex-col items-center md:flex">
            <div className="w-full max-w-5xl space-y-6 md:space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Overview
                    </h2>

                    <CalendarDateRangePicker />
                </div>

                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper
                        userId={userId as string}
                        from={from}
                        to={to}
                    />
                </Suspense>

                <Suspense fallback={<ChartsSkeleton />}>
                    <ChartWrapper
                        userId={userId as string}
                        from={from}
                        to={to}
                    />
                </Suspense>
            </div>
        </main>
    )
}
