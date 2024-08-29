import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CardSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-6 w-6 rounded-md" />
            </CardHeader>

            <CardContent>
                <Skeleton className="h-7 w-28 rounded-md" />
            </CardContent>
        </Card>
    )
}

export function CardsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )
}

export function ChartSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-28 rounded-md" />
            </CardHeader>

            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <Skeleton className="h-[242px] w-full rounded-md" />
            </CardContent>
        </Card>
    )
}

export function ChartsSkeleton() {
    return (
        <>
            <ChartSkeleton />
            <ChartSkeleton />
        </>
    )
}
