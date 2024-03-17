'use client'
import moment from 'moment'
import { numericFormatter } from 'react-number-format'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import DataTableActions from '@/app/(orders)/components/data-table/data-table-actions'
import { Order } from '@/app/(orders)/lib/type'

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
            <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
    )
}

export const columns: ColumnDef<Order>[] = [
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
        accessorKey: 'orderDate',
        header: ({ column }) => {
            return (
                <SortableHeader
                    headerName="Order Date"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                />
            )
        },
        cell: ({ row }) => moment(row.original.orderDate).format('YYYY-MM-DD'),
    },
    {
        accessorKey: 'grandTotal',
        header: ({ column }) => {
            return (
                <SortableHeader
                    headerName="Grand Total"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                />
            )
        },
        cell: ({ row }) =>
            numericFormatter(row.original.grandTotal.toString(), {
                prefix: '$',
                thousandSeparator: true,
            }),
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
                <SortableHeader
                    headerName="Created"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                />
            )
        },
        cell: ({ row }) => moment(row.original.createdAt).format('YYYY-MM-DD'),
    },
    {
        accessorKey: 'updatedAt',
        header: ({ column }) => {
            return (
                <SortableHeader
                    headerName="Updated"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                />
            )
        },
        cell: ({ row }) => moment(row.original.updatedAt).format('YYYY-MM-DD'),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return <DataTableActions orderId={row.original.id} />
        },
    },
]
