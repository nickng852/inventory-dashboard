'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as z from 'zod'

import { formSchema } from '@/lib/orders/formSchema'
import { prisma } from '@/lib/prisma'

export const createOrder = async (
    userId: string,
    data: z.infer<typeof formSchema>
) => {
    // backend validation
    const { products } = formSchema.parse(data)

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
        },
    })

    revalidatePath('/orders')
    redirect('/orders')
}

export const editOrder = async (
    userId: string,
    orderId: string,
    data: z.infer<typeof formSchema>
) => {
    // backend validation
    const { products } = formSchema.parse(data)

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
        },
    })

    revalidatePath('/orders')
    redirect('/orders')
}

export const deleteOrder = async (orderId: string) => {
    await prisma.order.delete({
        where: { id: orderId },
    })

    revalidatePath('/orders')
}

export const fetchOrdersByUserId = async (userId: string) => {
    const data = await prisma.order.findMany({
        where: { userId: userId },
    })

    revalidatePath('/orders')

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

    revalidatePath('/orders')

    return data
}
