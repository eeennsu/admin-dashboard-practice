import { Card } from 'antd'
import { useMemo, type FC } from 'react'
import { DollarOutlined } from '@ant-design/icons'
import { Area, type AreaConfig } from '@ant-design/plots'
import Text from '../common/Text'
import { HttpError, useList } from '@refinedev/core'
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'
import { mapDealsData } from '@/lib/utils'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { DashboardDealsChartQuery } from '@/graphql/types'

export type DealStage = GetFieldsFromList<DashboardDealsChartQuery>

const DealsChart: FC = () => {
    const { data } = useList<DealStage, HttpError>({
        resource: 'dealStages',
        meta: {
            gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
        },
    })

    const dealData = useMemo(() => mapDealsData(data?.data), [data?.data])

    const config: AreaConfig = {
        data: dealData,
        xField: 'timeText',
        yField: 'value',
        isStack: false,
        annotations: [
            {
                type: 'line',
                start: ['min', 'median'],
                end: ['max', 'median'],
                style: {
                    stroke: '#f1b260',
                    lineDash: [4, 4],
                },
            },
        ],
        seriesField: 'state',
        startOnZero: true,
        smooth: true,

        yAxis: {
            tickCount: 10,
            label: {
                formatter: (data) => {
                    return `${+data / 1000}k`
                },
            },
        },
        tooltip: {
            formatter: (data) => {
                return {
                    name: data.state,
                    value: `${+data.value / 1000}k`,
                }
            },
        },
        areaStyle: {
            fillOpacity: 0.15,
        },
        legend: {
            offsetY: -8,
            position: 'top-right',
        },
        point: {
            shape: 'circle',
            size: 5,
        },
        interactions: [
            {
                type: 'element-highlight',
            },
            {
                type: 'element-active',
            },
        ],
        slider: {
            start: 0,
            end: 1,
        },
    }

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
            <Area
                {...config}
                height={325}
            />
        </Card>
    )
}

export default DealsChart
