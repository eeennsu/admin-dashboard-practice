import { Flex } from 'antd'
import type { FC, PropsWithChildren, CSSProperties } from 'react'

interface Props {
    bgColor: CSSProperties['backgroundColor']
}

const IconWrapper: FC<PropsWithChildren<Props>> = ({ bgColor, children }) => {
    return (
        <Flex
            align='center'
            justify='center'
            style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: bgColor,
            }}>
            {children}
        </Flex>
    )
}

export default IconWrapper
