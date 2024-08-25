'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as z from 'zod'
import { auth } from '@clerk/nextjs/server'

import { formSchema } from '@/app/(dashboard)/(orders)/lib/formSchema'
import { prisma } from '@/lib/prisma'

export const createOrder = async (data: z.infer<typeof formSchema>) => {
    const { userId } = auth()

    if (!userId) {
        throw new Error('User not authenticated')
    }

    // backend validation
    const { orderDate, products, grandTotal } = formSchema.parse(data)

    if (!orderDate) {
        throw new Error('Order date is required')
    }

    if (!products) {
        throw new Error('Products are required')
    }

    if (!grandTotal) {
        throw new Error('Grand total is required')
    }

    await prisma.order.create({
        data: {
            userId: userId,
            orderItems: {
                create: products.map((product) => ({
                    product: {
                        connect: {
                            id: product.id,
                        },
                    },
                    quantity: Number(product.quantity),
                })),
            },
            orderDate: orderDate,
            grandTotal: Number(grandTotal),
        },
    })

    revalidatePath('/orders')
    redirect('/orders')
}

export const editOrder = async (
    orderId: string,
    data: z.infer<typeof formSchema>
) => {
    const { userId } = auth()

    if (!userId) {
        throw new Error('User not authenticated')
    }

    const order = await prisma.order.findUnique({
        where: { id: orderId },
    })

    if (!order) {
        throw new Error('Order not found')
    }

    // backend validation
    const { orderDate, products, grandTotal } = formSchema.parse(data)

    if (!orderDate) {
        throw new Error('Order date is required')
    }

    if (!products) {
        throw new Error('Products are required')
    }

    if (!grandTotal) {
        throw new Error('Grand total is required')
    }

    await prisma.orderItem.deleteMany({
        where: {
            orderId: orderId,
        },
    })

    await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            userId: userId,
            orderItems: {
                create: products.map((product) => ({
                    product: {
                        connect: {
                            id: product.id,
                        },
                    },
                    quantity: Number(product.quantity),
                })),
            },
            orderDate: orderDate,
            grandTotal: Number(grandTotal),
        },
    })

    revalidatePath('/orders')
    redirect('/orders')
}

export const deleteOrder = async (orderId: string) => {
    const { userId } = auth()

    if (!userId) {
        throw new Error('User not authenticated')
    }

    const order = await prisma.order.findUnique({
        where: { id: orderId },
    })

    if (!order) {
        throw new Error('Order not found')
    }

    if (order.userId !== userId) {
        throw new Error('You are not authorized to delete this order')
    }

    await prisma.order.delete({
        where: { id: orderId },
    })

    revalidatePath('/orders')
}

export const fetchOrdersByUserId = async (userId: string) => {
    const data = await prisma.order.findMany({
        where: { userId: userId },
    })

    return data
}

export const fetchOrdersByDate = async (
    userId: string,
    from: string,
    to: string
) => {
    const data = await prisma.order.groupBy({
        by: ['orderDate'],
        where: {
            userId: userId,
            orderDate: {
                gte: new Date(from),
                lte: new Date(to),
            },
        },
        _sum: {
            grandTotal: true,
        },
        _count: true,
        orderBy: {
            orderDate: 'asc',
        },
    })

    return data
}

export const fetchOrderByOrderId = async (orderId: string) => {
    const data = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    })

    return data
}
