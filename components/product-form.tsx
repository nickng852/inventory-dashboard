'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import ClickAwayListener from 'react-click-away-listener'
import { SketchPicker } from 'react-color'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'

import { createProduct, editProduct } from '@/app/action'
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

import { Product } from './data-table/columns'

export default function ProductForm({
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
    const [colorPickerOpen, setColorPickerOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data ? data.name : '',
            description: data ? (data.description as string) : '',
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
                    {editMode ? 'Edit Product' : 'Create a new product'}
                </h2>
                <p className="text-muted-foreground">
                    {editMode
                        ? 'Edit your product in one-click.'
                        : 'Fill in the information below to add a new product to your store'}
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
                                            }
                                        }}
                                        prefix={'$'}
                                        thousandSeparator={true}
                                        customInput={Input}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field: { value, ...fieldValues } }) => (
                                <FormItem>
                                    <FormLabel>Color*</FormLabel>
                                    <div className="flex gap-3">
                                        <FormControl>
                                            <Input
                                                value={value}
                                                placeholder="Pick a color"
                                                readOnly
                                                {...fieldValues}
                                            />
                                        </FormControl>

                                        <Button
                                            variant="secondary"
                                            className="relative"
                                            onClick={(e) => {
                                                e.preventDefault()

                                                setColorPickerOpen(
                                                    !colorPickerOpen
                                                )
                                            }}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        value ?? 'transparent',
                                                }}
                                                className="relative h-5 w-5 rounded-full"
                                            ></div>

                                            {colorPickerOpen && (
                                                <ClickAwayListener
                                                    onClickAway={() =>
                                                        setColorPickerOpen(
                                                            false
                                                        )
                                                    }
                                                >
                                                    <div
                                                        className="absolute right-0 top-12"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            e.stopPropagation()
                                                        }}
                                                    >
                                                        <SketchPicker
                                                            color={value}
                                                            onChange={(v) => {
                                                                if (v.hex) {
                                                                    fieldValues.onChange(
                                                                        v.hex
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </ClickAwayListener>
                                            )}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field: { value, ...fieldValues } }) => (
                                <FormItem>
                                    <FormLabel>Photo</FormLabel>

                                    {value && (
                                        <Image
                                            src={URL.createObjectURL(value)}
                                            alt={data?.name as string}
                                            className="rounded-lg"
                                            width={200}
                                            height={200}
                                            priority
                                        />
                                    )}

                                    {!value && data?.imageUrl && (
                                        <Image
                                            src={data.imageUrl}
                                            alt={data.name}
                                            className="rounded-lg"
                                            width={200}
                                            height={200}
                                            priority
                                            placeholder="blur"
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8dPVqPQAH+gL9EC8KowAAAABJRU5ErkJggg=="
                                        />
                                    )}

                                    <FormControl>
                                        <Input
                                            id="imageUrl"
                                            type="file"
                                            onChange={(e) =>
                                                fieldValues.onChange(
                                                    e.target.files?.[0]
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
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
