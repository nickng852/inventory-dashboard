import { columns } from '@/app/(products)/components/data-table/columns'
import { DataTable } from '@/app/(products)/components/data-table/data-table'
import { fetchProductsByProductName } from '@/app/(products)/lib/action'

export default async function ProductList({
    searchParams,
    userId,
}: {
    searchParams: { q: string }
    userId: string
}) {
    const search = searchParams.q ?? ''
    const data = await fetchProductsByProductName(userId, search)

    return (
        <div className="w-full">
            <DataTable
                data={JSON.parse(JSON.stringify(data))}
                columns={columns}
            />
        </div>
    )
}
