import { Product } from '@/app/(products)/lib/type'

export type Order = {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    orderDate: Date
    orderItems: {
        id: string
        product: Product
        quantity: string
    }[]
    grandTotal: number
}
