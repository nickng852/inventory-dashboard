import { columns } from '@/app/(orders)/components/data-table/columns'
import { DataTable } from '@/app/(orders)/components/data-table/data-table'
import { fetchOrdersByUserId } from '@/app/(orders)/lib/action'

export default async function OrderList({ userId }: { userId: string }) {
    const data = await fetchOrdersByUserId(userId)

    return (
        <div className="w-full">
            <DataTable
                data={JSON.parse(JSON.stringify(data))}
                columns={columns}
            />
        </div>
    )
}
