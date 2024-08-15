import { Prisma } from '@prisma/client'

export type Product = {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    name: string
    description?: string | null | undefined
    price: Prisma.Decimal | string | number
    color?: string | null | undefined
    imageUrl?: string | null | undefined
}
