import { Skeleton } from '@/components/ui/skeleton'

export function TableSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between space-x-4">
                <Skeleton className="h-9 w-96 rounded-md" />

                <Skeleton className="h-9 w-[92px] rounded-md" />
            </div>

            <Skeleton className="h-[290px] w-full rounded-md" />

            <div className="flex items-center justify-end space-x-[26px]">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-[105px] rounded-lg" />
                    <Skeleton className="h-8 w-[71px] rounded-md" />
                </div>

                <Skeleton className="h-8 w-24 rounded-lg" />

                <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
            </div>
        </div>
    )
}
