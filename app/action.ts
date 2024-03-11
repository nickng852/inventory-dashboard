'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { put } from '@vercel/blob'

import { formSchema } from '@/lib/formSchema'
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

    revalidatePath('/')
    redirect('/')
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

    revalidatePath('/')
    redirect('/')
}

export const deleteProduct = async (productId: string) => {
    await prisma.product.delete({
        where: { id: productId },
    })

    revalidatePath('/')
}

export const fetchProductsByUserId = async (userId: string) => {
    const data = await prisma.product.findMany({
        where: { userId: userId },
    })

    revalidatePath('/')

    return data
}

export const fetchProductByProductId = async (productId: string) => {
    const data = await prisma.product.findUnique({
        where: { id: productId },
    })

    revalidatePath('/')

    return data
}
