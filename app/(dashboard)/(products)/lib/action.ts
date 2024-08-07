'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { put } from '@vercel/blob'

import { formSchema } from '@/app/(dashboard)/(products)/lib/formSchema'
import { prisma } from '@/lib/prisma'

export const createProduct = async (userId: string, formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries())

    // backend validation
    const { name, description, price, color, image } =
        formSchema.parse(rawFormData)

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
    const rawFormData = Object.fromEntries(formData.entries())

    // backend validation
    const { name, description, price, color, image } =
        formSchema.parse(rawFormData)

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
    await prisma.product.delete({
        where: { id: productId },
    })

    revalidatePath('/products')
}

export const fetchProductsByUserId = async (userId: string) => {
    const data = await prisma.product.findMany({
        where: { userId: userId },
    })

    revalidatePath('/products')

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

    revalidatePath('/products')

    return data
}

export const fetchProductByProductId = async (productId: string) => {
    const data = await prisma.product.findUnique({
        where: { id: productId },
    })

    revalidatePath('/products')

    return data
}
