import { Product } from '@/app/(dashboard)/(products)/lib/type'

export interface Order {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    orderDate: Date
    grandTotal: number
}

export interface OrderWithOrderItems extends Order {
    orderItems: {
        id: string
        product: Product
        quantity: string
    }[]
}
