import { z } from 'zod'

export const appearanceFormSchema = z.object({
    theme: z.enum(['light', 'dark', 'system'], {
        required_error: 'Please select a theme.',
    }),
})

export type AppearanceFormValues = z.infer<typeof appearanceFormSchema>
