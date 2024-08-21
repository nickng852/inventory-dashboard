'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { put } from '@vercel/blob'

import { formSchema } from '@/app/(dashboard)/(products)/lib/formSchema'
import { prisma } from '@/lib/prisma'

export const createProduct = async (formData: FormData) => {
    const { userId } = auth()

    const rawFormData = Object.fromEntries(formData.entries())

    // backend validation
    const { name, description, price, color, image } =
        formSchema.parse(rawFormData)

    if (!userId) {
        throw new Error('User not authenticated')
    }

    if (!name) {
        throw new Error('Name is required')
    }

    if (!price) {
        throw new Error('Price is required')
    }

    if (!color) {
        throw new Error('Color is required')
    }

    const existingProduct = await prisma.product.findFirst({
        where: { name: name },
    })

    if (existingProduct) {
        throw new Error('Product already exists')
    }

    let imageUrl: string | undefined = undefined

    if (image) {
        const blob = await put(image.name, image, {
            access: 'public',
        })

        imageUrl = blob.url
    }

    await prisma.product.create({
        data: {
            name: name,
            description: description,
            price: Number(price),
            color: color,
            imageUrl: imageUrl,
            userId: userId,
        },
    })

    revalidatePath('/products')
    redirect('/products')
}

export const editProduct = async (productId: string, formData: FormData) => {
    const { userId } = auth()

    const rawFormData = Object.fromEntries(formData.entries())

    // backend validation
    const { name, description, price, color, image } =
        formSchema.parse(rawFormData)

    const product = await prisma.product.findUnique({
        where: { id: productId },
    })

    if (!product) {
        throw new Error('Product not found')
    }

    if (product.userId !== userId) {
        throw new Error('You are not authorized to edit this product')
    }

    const existingProduct = await prisma.product.findFirst({
        where: { name: name },
    })

    if (existingProduct) {
        throw new Error('Product already exists')
    }

    let imageUrl: string | undefined = undefined

    if (image) {
        const blob = await put(image.name, image, {
            access: 'public',
        })

        imageUrl = blob.url
    }

    await prisma.product.update({
        where: { id: productId },
        data: {
            name: name,
            description: description,
            price: Number(price),
            color: color,
            imageUrl: imageUrl,
        },
    })

    revalidatePath('/products')
    redirect('/products')
}

export const deleteProduct = async (productId: string) => {
    const { userId } = auth()

    const product = await prisma.product.findUnique({
        where: { id: productId },
    })

    if (!product) {
        throw new Error('Product not found')
    }

    if (product.userId !== userId) {
        throw new Error('You are not authorized to delete this product')
    }

    await prisma.product.delete({ where: { id: productId } })

    revalidatePath('/products')
}

export const fetchProductsByUserId = async (userId: string) => {
    const data = await prisma.product.findMany({
        where: { userId: userId },
    })

    return data
}

export const fetchProductsByDate = async (
    userId: string,
    from: string,
    to: string
) => {
    const data = await prisma.product.findMany({
        where: {
            userId: userId,
            createdAt: {
                gte: new Date(from),
                lte: new Date(to),
            },
        },
    })

    return data
}

export const fetchProductsByProductName = async (
    userId: string,
    query: string
) => {
    const data = await prisma.product.findMany({
        where: {
            userId: userId,
            name: {
                contains: query,
                mode: 'insensitive',
            },
        },
    })

    return data
}

export const fetchProductByProductId = async (productId: string) => {
    const data = await prisma.product.findUnique({
        where: { id: productId },
    })

    return data
}
