'use client'
import { ArrowUpDown } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import { numericFormatter } from 'react-number-format'
import { ColumnDef } from '@tanstack/react-table'

import DataTableActions from '@/app/orders/components/data-table/data-table-actions'

export type Product = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    description?: string | null | undefined
    price: string | number
    color?: string | null | undefined
    imageUrl?: string | null | undefined
    userId: string
}

const SortableHeader = ({
    headerName,
    onClick,
}: {
    headerName: string
    onClick: () => void
}) => {
    return (
        <div className="flex cursor-pointer items-center" onClick={onClick}>
            {headerName}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
    )
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <SortableHeader
                    headerName="Order ID"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                />
            )
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return <DataTableActions orderId={row.original.id} />
        },
    },
]
