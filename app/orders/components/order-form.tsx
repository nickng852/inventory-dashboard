'use client'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useForm, useFieldArray } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { CaretSortIcon, CheckIcon, PlusIcon } from '@radix-ui/react-icons'

import { Product } from '@/app/orders/components/data-table/columns'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { createOrder, editOrder } from '@/lib/orders/action'
import { formSchema } from '@/lib/orders/formSchema'
import { cn } from '@/lib/utils'

export type Order = {
    id: string
    orderItems: {
        id: string
        product: Product
        quantity: string
    }[]
    userId: string
}

export default function OrderForm({
    editMode,
    userId,
    order,
    products,
}: {
    editMode?: boolean
    userId: string
    order?: Order
    products: Product[]
}) {
    console.log('order', order)
    console.log('products', products)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            products: order
                ? order?.orderItems.map((item) => ({
                      id: item.product.id,
                      quantity: item.quantity.toString(),
                  }))
                : [{ id: '', quantity: '' }],
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log('data:', data)

        return create(data)
    }

    const create = async (data: z.infer<typeof formSchema>) => {
        try {
            await createOrder(userId, data)
            toast({
                description: 'Order created successfully.',
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

    const edit = async (orderId: string, data: z.infer<typeof formSchema>) => {
        try {
            await editOrder(orderId, data)
            toast({
                description: 'Order edited successfully.',
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

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'products',
    })

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
                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex flex-col items-center gap-4 border-b pb-4 md:flex-row"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`products.${index}.id`}
                                        render={({ field }) => {
                                            console.log('field', field)
                                            return (
                                                <FormItem className="w-full">
                                                    <FormLabel>
                                                        Product
                                                    </FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        'w-full justify-between',
                                                                        !field.value &&
                                                                            'text-muted-foreground'
                                                                    )}
                                                                >
                                                                    {editMode
                                                                        ? field.value
                                                                            ? order?.orderItems.find(
                                                                                  (
                                                                                      item
                                                                                  ) =>
                                                                                      item
                                                                                          .product
                                                                                          .id ===
                                                                                      field.value
                                                                              )
                                                                                  ?.product
                                                                                  .name
                                                                            : 'Select product'
                                                                        : field.value
                                                                          ? products.find(
                                                                                (
                                                                                    product
                                                                                ) =>
                                                                                    product.id ===
                                                                                    field.value
                                                                            )
                                                                                ?.name
                                                                          : 'Select product'}
                                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="p-0"
                                                            side="bottom"
                                                            align="start"
                                                        >
                                                            <Command>
                                                                <CommandInput
                                                                    placeholder="Search product..."
                                                                    className="h-9"
                                                                />
                                                                <CommandList>
                                                                    <CommandEmpty>
                                                                        No
                                                                        product
                                                                        found.
                                                                    </CommandEmpty>
                                                                    <CommandGroup>
                                                                        {products.map(
                                                                            (
                                                                                product
                                                                            ) => (
                                                                                <CommandItem
                                                                                    value={
                                                                                        product.name
                                                                                    }
                                                                                    key={
                                                                                        product.id
                                                                                    }
                                                                                    onSelect={() => {
                                                                                        form.setValue(
                                                                                            `products.${index}.id`,
                                                                                            product.id
                                                                                        )
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        product.name
                                                                                    }
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            'ml-auto h-4 w-4',
                                                                                            product.id ===
                                                                                                field.value
                                                                                                ? 'opacity-100'
                                                                                                : 'opacity-0'
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            )
                                                                        )}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`products.${index}.quantity`}
                                        render={({
                                            field: { value, ...fieldValues },
                                        }) => (
                                            <FormItem className="w-full md:w-auto">
                                                <FormLabel>Quantity</FormLabel>
                                                <FormControl>
                                                    <NumericFormat
                                                        value={value}
                                                        onValueChange={(v) => {
                                                            if (v.floatValue) {
                                                                fieldValues.onChange(
                                                                    v.floatValue.toString()
                                                                )
                                                            } else {
                                                                fieldValues.onChange(
                                                                    ''
                                                                )
                                                            }
                                                        }}
                                                        thousandSeparator={true}
                                                        customInput={Input}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {index > 0 && (
                                        <Link
                                            href="#"
                                            className={cn(
                                                buttonVariants({
                                                    variant: 'secondary',
                                                    size: 'icon',
                                                }),
                                                'w-full md:h-9 md:min-h-9 md:w-9 md:min-w-9'
                                            )}
                                            onClick={() => {
                                                remove(index)
                                            }}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4 md:mr-0" />
                                            <p className="md:hidden">Remove</p>
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <Button
                                variant="ghost"
                                onClick={(e) => {
                                    e.preventDefault()

                                    append({
                                        id: '',
                                        quantity: '',
                                    })
                                }}
                            >
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add More
                            </Button>
                        </div>

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
