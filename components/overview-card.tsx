import { numericFormatter } from 'react-number-format'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
                <div className="text-2xl font-bold">
                    {numericFormatter(data.toString(), {
                        ...(prefix && { prefix: prefix }),
                        thousandSeparator: true,
                    })}
                </div>
                {type === 'percentage' && (
                    <p className="text-xs text-muted-foreground">
                        +19% from last month
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
