import * as z from 'zod'

export const formSchema = z.object({
    products: z
        .object({
            id: z.string().min(1, { message: 'Required' }),
            quantity: z.string().min(1, { message: 'Required' }),
        })
        .array()
        .min(1, { message: 'At least one product in an order' }),
})
