'use client'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'

type Props = {
    _sum: {
        grandTotal: number
    }
    _count: number
    orderDate: Date
}[]

const chartConfig = {
    '_sum.grandTotal': {
        label: 'Grand Total',
    },
} satisfies ChartConfig

export default function TotalRevenueChart({ data }: { data: Props }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient
                                id="fillGrandTotal"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-grandTotal)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-grandTotal)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="orderDate"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })
                            }}
                            interval="preserveStartEnd"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="dot"
                                    hideLabel
                                    hideIndicator
                                />
                            }
                        />
                        <Area
                            dataKey="_sum.grandTotal"
                            type="natural"
                            fill="url(#fillGrandTotal)"
                            stroke="var(--color-grandTotal)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
