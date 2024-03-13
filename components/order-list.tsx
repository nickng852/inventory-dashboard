import { fetchProductsByUserId } from '@/lib/products/action'

import { columns } from './data-table/columns'
import { DataTable } from './data-table/data-table'

export default async function OrderList({ userId }: { userId: string }) {
    const data = await fetchProductsByUserId(userId)

    return (
        <div className="w-full">
            <DataTable
                data={JSON.parse(JSON.stringify(data))}
                columns={columns}
            />
        </div>
    )
}
