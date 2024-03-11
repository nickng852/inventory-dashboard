import * as z from 'zod'

export const formSchema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    description: z.string().optional(),
    price: z.string().min(1, { message: 'Required' }),
    color: z.string().optional(),
    image: z.custom<File | undefined>(),
})
