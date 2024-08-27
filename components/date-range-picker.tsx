'use client'
import * as React from 'react'
import { sub, format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { DateRange } from 'react-day-picker'
import { CalendarIcon } from '@radix-ui/react-icons'
import { PopoverClose } from '@radix-ui/react-popover'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function CalendarDateRangePicker({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter()

    const searchParams = useSearchParams()

    const urlFrom = searchParams.get('from')
    const urlTo = searchParams.get('to')

    // date are not using url one
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: urlFrom ? new Date(urlFrom) : sub(new Date(), { days: 30 }),
        to: urlTo ? new Date(urlTo) : new Date(),
    })

    const apply = () => {
        const url =
            date?.from && date?.to
                ? `${window.location.origin}?from=${formatDate(date.from)}&to=${formatDate(date.to)}`
                : window.location.origin

        router.push(url)
    }

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[260px] justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} -{' '}
                                    {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    <div className="flex w-full justify-end p-4">
                        <PopoverClose asChild>
                            <Button onClick={apply}>Apply</Button>
                        </PopoverClose>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
