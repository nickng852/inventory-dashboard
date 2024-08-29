import { prisma } from '@/lib/prisma'

export const fetchCardData = async (
    userId: string,
    from: string,
    to: string
) => {
    const totalProducts = await prisma.product.count({
        where: {
            userId: userId,
            createdAt: {
                gte: new Date(from),
                lte: new Date(to),
            },
        },
    })

    const totalOrders = await prisma.order.count({
        where: {
            userId: userId,
            orderDate: {
                gte: new Date(from),
                lte: new Date(to),
            },
        },
    })

    const totalRevenue = await prisma.order.aggregate({
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
    })

    const data = await Promise.all([totalProducts, totalOrders, totalRevenue])

    return {
        totalProducts: Number(data[0]) || 0,
        totalOrders: Number(data[1]) || 0,
        totalRevenue: Number(data[2]._sum.grandTotal) || 0,
    }
}
