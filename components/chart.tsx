'use client'
import moment from 'moment'
import { useTheme } from 'next-themes'
import { numericFormatter } from 'react-number-format'
import {
    LineChart,
    Line,
    Tooltip,
    TooltipProps,
    ResponsiveContainer,
} from 'recharts'
import {
    ValueType,
    NameType,
} from 'recharts/types/component/DefaultTooltipContent'

import { Order } from '@/app/(orders)/lib/type'
import { useConfig } from '@/lib/hooks/use-config'
import { themes } from '@/lib/themes'

const CustomTooltip = ({
    active,
    payload,
}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {moment(payload[0].payload.orderDate).format(
                            'YYYY/MM/DD'
                        )}
                    </span>
                    <span className="font-bold">
                        {numericFormatter(
                            (payload[0].value as string).toString(),
                            {
                                prefix: '$',
                                thousandSeparator: true,
                            }
                        )}
                    </span>
                </div>
            </div>
        )
    }

    return null
}

export default function Chart({ data }: { data: Order[] }) {
    const { theme: mode } = useTheme()
    const [config] = useConfig()

    const theme = themes.find((theme) => theme.name === config.theme)

    return (
        <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="grandTotal"
                        strokeWidth={2}
                        activeDot={{
                            r: 6,
                            style: { fill: 'var(--theme-primary)' },
                        }}
                        style={
                            {
                                stroke: 'var(--theme-primary)',
                                '--theme-primary': `hsl(${
                                    theme?.cssVars[
                                        mode === 'dark' ? 'dark' : 'light'
                                    ].primary
                                })`,
                            } as React.CSSProperties
                        }
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
