import Text from '@/components/common/Text'
import { PlusSquareOutlined } from '@ant-design/icons'
import { ButtonProps, Button } from 'antd'
import type { FC, PropsWithChildren } from 'react'

const KanbanAddCardButton: FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
    return (
        <Button
            size='large'
            icon={<PlusSquareOutlined className='md' />}
            style={{ margin: 16, backgroundColor: 'white' }}
            {...props}>
            {children ?? (
                <Text
                    size='md'
                    type='secondary'>
                    Add new card
                </Text>
            )}
        </Button>
    )
}

export default KanbanAddCardButton
