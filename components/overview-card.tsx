import { numericFormatter } from 'react-number-format'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

type Props = {
    type: string
    cardTitle: string
    cardIcon: React.ReactNode
    data: number
    prefix?: string
}

export default async function OverviewCard({
    type,
    cardTitle,
    cardIcon,
    data,
    prefix,
}: Props) {
    return (
        <Card>
            <CardHeader
                className={`flex flex-row items-center justify-between space-y-0 ${type === 'percentage' && 'pb-2'}`}
            >
                <CardTitle className="text-sm font-medium">
                    {cardTitle}
                </CardTitle>
                {cardIcon}
            </CardHeader>
            <CardContent>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="text-2xl font-bold">
                                {type === 'dollar' && <span>$</span>}
                                {Intl.NumberFormat('en-US', {
                                    notation: 'compact',
                                    maximumFractionDigits: 2,
                                }).format(data)}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>
                                {numericFormatter(data.toString(), {
                                    ...(prefix && { prefix: prefix }),
                                    thousandSeparator: true,
                                })}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardContent>
        </Card>
    )
}
