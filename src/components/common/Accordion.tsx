import type { FC, PropsWithChildren } from 'react'
import Text from './Text'
import AccordionHeaderSkeleton from '../skeletons/ArccordionHeaerSkeleton'

interface Props {
    accordionKey: string
    activeKey?: string
    setActive: (key?: string) => void
    fallback: string | React.ReactNode
    isLoading?: boolean
    icon: React.ReactNode
    label: string
}

export const Accordion: FC<PropsWithChildren<Props>> = ({
    accordionKey,
    activeKey,
    setActive,
    fallback,
    icon,
    label,
    children,
    isLoading,
}) => {
    if (isLoading) return <AccordionHeaderSkeleton />

    const isActive = activeKey === accordionKey

    const toggleAccordion = () => {
        if (isActive) {
            setActive(undefined)
        } else {
            setActive(accordionKey)
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                padding: '12px 24px',
                gap: '12px',
                alignItems: 'start',
                borderBottom: '1px solid #d9d9d9',
            }}>
            <div style={{ marginTop: '1px', flexShrink: 0 }}>{icon}</div>
            {isActive ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        flex: 1,
                    }}>
                    <Text
                        strong
                        onClick={toggleAccordion}
                        style={{ cursor: 'pointer' }}>
                        {label}
                    </Text>
                    {children}
                </div>
            ) : (
                <div
                    onClick={toggleAccordion}
                    style={{ cursor: 'pointer', flex: 1 }}>
                    {fallback}
                </div>
            )}
        </div>
    )
}
