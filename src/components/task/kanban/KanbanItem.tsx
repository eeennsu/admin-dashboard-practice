import { cn } from '@/lib/utils'
import { DragOverlay, useDraggable, UseDraggableArguments, UseDroppableArguments } from '@dnd-kit/core'
import type { FC, PropsWithChildren } from 'react'

interface Props {
    id: UseDroppableArguments['id']
    data?: UseDraggableArguments['data']
}

const KanbanItem: FC<PropsWithChildren<Props>> = ({ id, data, children }) => {
    const { attributes, listeners, setNodeRef, active, transform } = useDraggable({ id, data })

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined

    return (
        <div className='relative'>
            <div
                ref={setNodeRef}
                className={cn(
                    'rounded-[8px] relative cursor-grab',
                    active ? (active.id === id ? 'opacity-100' : 'opacity-50') : 'opacity-100'
                )}
                {...attributes}
                {...listeners}>
                {active?.id === id && (
                    <DragOverlay zIndex={1000}>
                        <div className='rounded-[8px] shadow-lg cursor-grab'>{children}</div>
                    </DragOverlay>
                )}
                {children}
            </div>
        </div>
    )
}

export default KanbanItem
