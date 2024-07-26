import { Card } from 'antd'
import { useMemo, type FC } from 'react'
import { DollarOutlined } from '@ant-design/icons'
import Text from '../common/Text'
import { HttpError, useList } from '@refinedev/core'
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'
import { getYearAndMonth, mapDealsData } from '@/lib/utils'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { DashboardDealsChartQuery } from '@/graphql/types'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'

export type DealStage = GetFieldsFromList<DashboardDealsChartQuery>

const DealsChart: FC = () => {
    const { data } = useList<DealStage, HttpError>({
        resource: 'dealStages',
        meta: {
            gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
        },
        pagination: {
            mode: 'off',
        },
    })

    const dealData = useMemo(() => mapDealsData(data?.data), [data?.data])

    console.log(dealData)

    const chartConfig = {
        won: {
            label: 'Won',
            color: '#235ac7',
        },
        lost: {
            label: 'Lost',
            color: '#3ab16f',
        },
    } satisfies ChartConfig

    return (
        <Card
            style={{ height: '100%' }}
            styles={{
                header: { padding: '8px 16px' },
                body: { padding: '24px 24px 0 24px' },
            }}
            title={
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                    <DollarOutlined />
                    <Text
                        size='sm'
                        style={{ marginLeft: '0.5rem' }}>
                        Deals
                    </Text>
                </div>
            }>
            <ChartContainer config={chartConfig}>
                <AreaChart
                    accessibilityLayer
                    data={dealData}
                    margin={{ right: 24, bottom: 12, top: 12 }}>
                    <CartesianGrid
                        vertical={false}
                        stroke='lightgray'
                        opacity={0.6}
                    />
                    <YAxis
                        tickLine={false}
                        tickMargin={8}
                        tickCount={8}
                        tickFormatter={(value) => {
                            const formatted = value / 1000

                            return formatted <= 0 ? '0' : `${formatted}k`
                        }}
                    />
                    <XAxis
                        dataKey='timeText'
                        tickLine
                        axisLine
                        tickMargin={10}
                        tickFormatter={(value) => getYearAndMonth(value)}
                    />
                    <ChartTooltip content={<ChartTooltipContent indicator='dot' />} />
                    <ChartLegend
                        layout='horizontal'
                        verticalAlign='top'
                        content={<ChartLegendContent />}
                    />
                    <Area
                        dataKey='won'
                        type='natural'
                        fill='var(--color-won)'
                        fillOpacity={0.4}
                        stroke='var(--color-won)'
                        strokeWidth={1.8}
                        connectNulls
                    />
                    <Area
                        dataKey='lost'
                        type='natural'
                        fill='var(--color-lost)'
                        fillOpacity={0.4}
                        stroke='var(--color-lost)'
                        strokeWidth={1.8}
                        connectNulls
                    />
                </AreaChart>
            </ChartContainer>
        </Card>
    )
}

export default DealsChart
