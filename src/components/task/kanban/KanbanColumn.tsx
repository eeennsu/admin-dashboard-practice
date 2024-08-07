import Text from '@/components/common/Text'
import { cn } from '@/lib/utils'
import { PlusOutlined } from '@ant-design/icons'
import { useDroppable, UseDroppableArguments } from '@dnd-kit/core'
import { Badge, Button } from 'antd'
import type { FC, PropsWithChildren } from 'react'

interface Props {
    id: UseDroppableArguments['id']
    title: string
    count: number
    description?: string
    data?: UseDroppableArguments['data']
    onAddTask?: ({ stageId }: { stageId: UseDroppableArguments['id'] }) => void
}

// Droppable
const KanbanColumn: FC<PropsWithChildren<Props>> = ({ id, title, description, count, data, onAddTask, children }) => {
    const { isOver, setNodeRef, active } = useDroppable({
        id,
        data,
    })

    const style = {
        color: isOver ? 'green' : undefined,
    }

    return (
        <section
            ref={setNodeRef}
            className='flex flex-col px-4'
            style={style}>
            <div className='p-4'>
                <div className='flex items-center justify-between w-full gap-4'>
                    <div className='flex gap-2'>
                        <Text
                            ellipsis={{ tooltip: title }}
                            size='xs'
                            strong
                            className='uppercase whitespace-nowrap'>
                            {title}
                        </Text>
                        {!!count && (
                            <Badge
                                count={count}
                                color='cyan'
                            />
                        )}
                    </div>
                    <Button
                        shape='circle'
                        icon={<PlusOutlined />}
                        onClick={() => {
                            onAddTask?.({ stageId: id })
                        }}
                    />
                </div>
                {description}
            </div>
            <div
                className={cn(
                    'flex-1 border-2 border-dashed rounded-[8px] px-3 transition-all',
                    isOver ? 'border-gray-400' : 'border-transparent'
                )}
                style={{ overflowY: active ? 'unset' : 'auto' }}>
                <div className='flex flex-col gap-2 mt-3'>{children}</div>
            </div>
        </section>
    )
}

export default KanbanColumn
