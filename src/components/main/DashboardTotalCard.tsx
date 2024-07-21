import { Card } from 'antd'
import type { FC } from 'react'
import {} from '@ant-design/icons'
import { TotalCountType } from '@/lib/constants/main'

interface Props {
    resource: TotalCountType
    isLoading: boolean
    total?: number
}

const DashboardTotalCard: FC<Props> = ({ resource, isLoading, total }) => {
    return (
        <Card
            title={
                <div>
                    <div>
                        <span>{total}</span>
                    </div>
                </div>
            }>
            DashboardTotalCard
        </Card>
    )
}

export default DashboardTotalCard
