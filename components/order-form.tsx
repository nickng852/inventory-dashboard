'use client'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { formSchema } from '@/lib/formSchema'
import { createProduct, editProduct } from '@/lib/products/action'

import { Product } from './data-table/columns'

export default function OrderForm({
    editMode,
    userId,
    data,
}: {
    editMode?: boolean
    userId: string
    data?: Product
}) {
    const params = useParams()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data ? data.name : '',
            description: data ? data.description ?? '' : '',
            price: data ? (data.price as string) : '',
            color: data ? (data.color as string) : '',
            image: undefined,
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value)
            }
        })

        return editMode
            ? edit(params.productId as string, formData)
            : create(formData)
    }

    const create = async (data: FormData) => {
        try {
            await createProduct(userId, data)
            toast({
                description: 'Product created successfully.',
            })
        } catch (err) {
            console.log(err)
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
            })
        }
    }

    const edit = async (productId: string, data: FormData) => {
        try {
            await editProduct(productId, data)
            toast({
                description: 'Product edited successfully.',
            })
        } catch (err) {
            console.log(err)
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
            })
        }
    }

    return (
        <div className="w-full max-w-4xl space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">
                    {editMode ? 'Edit Order' : 'Create a new order'}
                </h2>
                <p className="text-muted-foreground">
                    {editMode
                        ? 'Edit your order in one-click.'
                        : 'Fill in the information below to add a new order to your store'}
                </p>
            </div>

            <div className="rounded-lg border p-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name*</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Product Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter Product Description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field: { value, ...fieldValues } }) => (
                                <FormItem>
                                    <FormLabel>Price*</FormLabel>
                                    <NumericFormat
                                        value={value}
                                        onValueChange={(v) => {
                                            if (v.floatValue) {
                                                fieldValues.onChange(
                                                    v.floatValue.toString()
                                                )
                                            } else {
                                                fieldValues.onChange('')
                                            }
                                        }}
                                        prefix={'$'}
                                        thousandSeparator={true}
                                        customInput={Input}
                                        placeholder="Enter Product Price"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full md:w-auto"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting && (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {editMode ? 'Save' : 'Submit'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
