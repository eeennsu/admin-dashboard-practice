import { Card, Flex, Skeleton } from 'antd'
import type { FC } from 'react'
import { TotalCountType, totalCountVariants } from '@/lib/constants/main'
import Text from '../common/Text'
import { Area, AreaChart, CartesianGrid } from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface Props {
    resource: TotalCountType
    isLoading: boolean
    totalCount?: number
}

const DashboardTotalCard: FC<Props> = ({ resource, isLoading, totalCount }) => {
    const { icon, title } = totalCountVariants[resource]

    const chartConfig = {
        value: {
            label: 'value',
            color: totalCountVariants[resource].primaryColor,
        },
    } satisfies ChartConfig

    return (
        <Card
            size='small'
            styles={{
                body: {
                    padding: 16,
                },
            }}>
            <Flex
                align='center'
                justify='space-between'>
                <Flex
                    align='center'
                    vertical
                    gap={4}>
                    <Flex
                        align='center'
                        gap={8}
                        style={{ whiteSpace: 'nowrap' }}>
                        {icon}
                        <Text
                            className='secondary'
                            style={{ marginLeft: 8 }}
                            size='sm'>
                            {title}
                        </Text>
                    </Flex>

                    <Text
                        strong
                        size='xxxl'
                        style={{
                            flex: 1,
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            marginLeft: 48,
                            fontVariantNumeric: 'tabular-nums',
                        }}>
                        {isLoading ? <Skeleton.Button style={{ marginTop: 8, width: 70 }} /> : totalCount}
                    </Text>
                </Flex>
                <ChartContainer
                    style={{
                        width: '50%',
                        paddingBlock: 12,
                    }}
                    config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={totalCount ? totalCountVariants[resource].data : []}>
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent />}
                        />
                        <defs>
                            <linearGradient
                                id={`fillValue-${resource}`}
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'>
                                <stop
                                    offset='10%'
                                    stopColor={totalCountVariants[resource].primaryColor}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset='90%'
                                    stopColor={totalCountVariants[resource].primaryColor}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey='value'
                            type='natural'
                            fill={`url(#fillValue-${resource})`}
                            fillOpacity={0.3}
                            stroke={totalCountVariants[resource].primaryColor}
                            strokeWidth={2.6}
                            stackId='a'
                        />
                    </AreaChart>
                </ChartContainer>
            </Flex>
        </Card>
    )
}

export default DashboardTotalCard
