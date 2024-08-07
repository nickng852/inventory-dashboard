'use client'
import { useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { NumericFormat, numericFormatter } from 'react-number-format'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { CaretSortIcon, CheckIcon, PlusIcon } from '@radix-ui/react-icons'
import { CalendarIcon } from '@radix-ui/react-icons'

import { createOrder, editOrder } from '@/app/(dashboard)/(orders)/lib/action'
import { formSchema } from '@/app/(dashboard)/(orders)/lib/formSchema'
import { OrderWithOrderItems } from '@/app/(dashboard)/(orders)/lib/type'
import { Product } from '@/app/(dashboard)/(products)/lib/type'
import { Button, buttonVariants } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { cn } from '@/lib/utils'

export default function OrderForm({
    editMode,
    userId,
    order,
    products,
}: {
    editMode?: boolean
    userId: string
    order?: OrderWithOrderItems
    products: Product[]
}) {
    const params = useParams()
    const { toast } = useToast()

    const initialFieldArrayObj = {
        id: '',
        quantity: '',
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orderDate: order ? new Date(order?.orderDate) : undefined,
            products: order
                ? order?.orderItems.map((item) => ({
                      id: item.product.id,
                      quantity: item.quantity.toString(),
                  }))
                : [initialFieldArrayObj],
            grandTotal: order ? order?.grandTotal : 0,
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'products',
    })

    const orderItems = form.watch('products')

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        return editMode ? edit(params.orderId as string, data) : create(data)
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
            await editOrder(userId, orderId, data)
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

    const getUnitPrice = (productId: string) => {
        const match = products.find((product) => product.id === productId)
        return match ? Number(match.price) : 0
    }

    const getTotalPrice = (productId: string, quantity: number) => {
        const unitPrice = getUnitPrice(productId)
        return unitPrice * quantity
    }

    const grandTotal = orderItems.reduce((acc, cV) => {
        return (acc += getUnitPrice(cV.id) * Number(cV.quantity))
    }, 0)

    useEffect(() => {
        form.setValue('grandTotal', grandTotal)
    }, [form, grandTotal])

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
                            <FormField
                                control={form.control}
                                name="orderDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Order Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-full pl-3 text-left font-normal',
                                                            !field.value &&
                                                                'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            moment(
                                                                field.value
                                                            ).format(
                                                                'YYYY/MM/DD'
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                '1900-01-01'
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="flex flex-col items-center gap-4 border-b pb-4 md:flex-row"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`products.${index}.id`}
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Product</FormLabel>
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
                                                                              .name ??
                                                                          products.find(
                                                                              (
                                                                                  product
                                                                              ) =>
                                                                                  product.id ===
                                                                                  field.value
                                                                          )
                                                                              ?.name
                                                                        : 'Select product'
                                                                    : field.value
                                                                      ? products.find(
                                                                            (
                                                                                product
                                                                            ) =>
                                                                                product.id ===
                                                                                field.value
                                                                        )?.name
                                                                      : 'Select product'}
                                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-auto p-0"
                                                        align="start"
                                                    >
                                                        <Command>
                                                            <CommandInput
                                                                placeholder="Search product..."
                                                                className="h-9"
                                                            />
                                                            <CommandList>
                                                                <CommandEmpty>
                                                                    No product
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
                                        )}
                                    />

                                    <FormItem className="w-full">
                                        <FormLabel>Unit Price</FormLabel>
                                        <p className="h-9 py-2">
                                            {numericFormatter(
                                                getUnitPrice(
                                                    orderItems[index].id
                                                ).toString(),
                                                {
                                                    prefix: '$',
                                                    thousandSeparator: true,
                                                }
                                            )}
                                        </p>
                                    </FormItem>

                                    <FormField
                                        control={form.control}
                                        name={`products.${index}.quantity`}
                                        render={({
                                            field: { value, ...fieldValues },
                                        }) => (
                                            <FormItem className="w-full">
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

                                    <FormItem className="flex w-full flex-col">
                                        <FormLabel className="md:text-right">
                                            Total
                                        </FormLabel>
                                        <p className="h-9 py-2 md:text-right">
                                            {numericFormatter(
                                                getTotalPrice(
                                                    orderItems[index].id,
                                                    Number(
                                                        orderItems[index]
                                                            .quantity
                                                    )
                                                ).toString(),
                                                {
                                                    prefix: '$',
                                                    thousandSeparator: true,
                                                }
                                            )}
                                        </p>
                                    </FormItem>

                                    {fields.length !== 1 && (
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
                                    append(initialFieldArrayObj)
                                }}
                            >
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add More
                            </Button>

                            <div className="flex w-full justify-end">
                                <FormField
                                    control={form.control}
                                    name="grandTotal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Grand Total:</FormLabel>
                                            <FormControl>
                                                <div className="text-right">
                                                    {numericFormatter(
                                                        field.value.toString(),
                                                        {
                                                            prefix: '$',
                                                            thousandSeparator:
                                                                true,
                                                        }
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {form.formState.errors.products && (
                            <FormMessage>
                                {form.formState.errors.products.message}
                            </FormMessage>
                        )}

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
