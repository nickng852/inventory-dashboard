import { columns } from '@/app/products/components/data-table/columns'
import { DataTable } from '@/app/products/components/data-table/data-table'
import { fetchProductsByUserId } from '@/lib/products/action'

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
