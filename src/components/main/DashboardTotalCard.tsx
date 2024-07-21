import { Card, Flex, Skeleton } from 'antd'
import type { FC } from 'react'
import {} from '@ant-design/icons'
import { TotalCountType, totalCountVariants } from '@/lib/constants/main'
import Text from '../common/Text'
import { Area, AreaConfig } from '@ant-design/plots'

interface Props {
    resource: TotalCountType
    isLoading: boolean
    totalCount?: number
}

const DashboardTotalCard: FC<Props> = ({ resource, isLoading, totalCount }) => {
    const { data, icon, title, primaryColor, secondaryColor } = totalCountVariants[resource]

    const config: AreaConfig = {
        data: totalCount ? totalCountVariants[resource].data : [],
        xField: 'index',
        yField: 'value',
        appendPadding: [4, 4, 4, 4],
        syncViewPadding: true,
        autoFit: true,
        tooltip: false,
        smooth: true,
        animation: true,
        yAxis: {
            tickCount: 3,
            label: {
                style: {
                    stroke: 'transparent',
                },
                formatter: (v) => {
                    return `${+v / 1000}k`
                },
            },
        },
        height: 100,
        point: {
            shape: 'circle',
            size: 4,
            color: primaryColor,
        },
        line: {
            color: primaryColor,
        },
        areaStyle: () => {
            return {
                fill: `l(270) 0:#fff 0.2:${secondaryColor} 1:${primaryColor}`,
            }
        },
    }

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
                <Area
                    {...config}
                    style={{ width: '50%' }}
                />
            </Flex>
        </Card>
    )
}

export default DashboardTotalCard
