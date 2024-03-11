import { fetchProductsByUserId } from '@/app/action'

import { columns } from './data-table/columns'
import { DataTable } from './data-table/data-table'

export default async function ProductList({ userId }: { userId: string }) {
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
