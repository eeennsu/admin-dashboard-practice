import LatestActivities from '@/components/main/LatestActivities'
import DashboardTotalCard from '@/components/main/DashboardTotalCard'
import DealsChart from '@/components/main/DealsChart'
import Events from '@/components/main/Events'
import { DASHBOARD_TOTAL_COUNTS_QUERY } from '@/graphql/queries'
import { DashboardTotalCountsQuery } from '@/graphql/types'
import { useCustom } from '@refinedev/core'
import { Col, Row } from 'antd'
import { FC } from 'react'

export const MainPage: FC = () => {
    const { data, isLoading } = useCustom<DashboardTotalCountsQuery>({
        url: '',
        method: 'get',
        meta: {
            gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY,
        },
    })

    return (
        <main
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
            }}>
            <Row gutter={[30, 30]}>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}>
                    <DashboardTotalCard
                        resource='companies'
                        isLoading={isLoading}
                        totalCount={data?.data.companies.totalCount}
                    />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}>
                    <DashboardTotalCard
                        resource='contacts'
                        isLoading={isLoading}
                        totalCount={data?.data.contacts.totalCount}
                    />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}>
                    <DashboardTotalCard
                        resource='deals'
                        isLoading={isLoading}
                        totalCount={data?.data.deals.totalCount}
                    />
                </Col>
            </Row>
            <Row gutter={[30, 30]}>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}>
                    <Events type='previous' />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={16}>
                    <DealsChart />
                </Col>
            </Row>

            <Row gutter={[30, 30]}>
                <Col span={24}>
                    <LatestActivities />
                </Col>
            </Row>
        </main>
    )
}
