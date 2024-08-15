'use client'
import Image from 'next/image'
import { numericFormatter } from 'react-number-format'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import DataTableActions from '@/app/(dashboard)/(products)/components/data-table/data-table-actions'
import { Product } from '@/app/(dashboard)/(products)/lib/type'
import { formatDate } from '@/lib/utils'

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

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'color',
        header: 'Color',
        cell: ({ row }) => {
            if (row.original.color)
                return (
                    <div
                        style={{ backgroundColor: row.original.color }}
                        className="ml-2 h-4 w-4 rounded-full"
                    ></div>
                )
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <SortableHeader
                    headerName="Name"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                />
            )
        },
    },
    {
        accessorKey: 'price',
        accessorFn: (originalRow) => Number(originalRow.price),
        header: ({ column }) => {
            return (
                <SortableHeader
                    headerName="Price"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                />
            )
        },
        cell: ({ row }) =>
            numericFormatter(row.original.price.toString(), {
                prefix: '$',
                thousandSeparator: true,
            }),
    },
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            if (row.original.imageUrl)
                return (
                    <div className="h-[35px] w-[55px]">
                        <Image
                            src={row.original.imageUrl}
                            alt={row.original.name}
                            className="h-full w-full rounded-md object-cover"
                            width={50}
                            height={50}
                            priority
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8dPVqPQAH+gL9EC8KowAAAABJRU5ErkJggg=="
                        />
                    </div>
                )
        },
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
        cell: ({ row }) => formatDate(row.original.createdAt),
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
        cell: ({ row }) => formatDate(row.original.updatedAt),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return <DataTableActions productId={row.original.id} />
        },
    },
]
