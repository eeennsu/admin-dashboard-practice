import { DndContext, DragEndEvent, SensorDescriptor, } from '@dnd-kit/core'
import type { FC, PropsWithChildren } from 'react'

interface Props {
    onDragEnd: (e: DragEndEvent) => void
    sensors: SensorDescriptor<any>[]
}

const KanbanBoard: FC<PropsWithChildren<Props>> = ({ children, onDragEnd, sensors }) => {
    return <DndContext onDragEnd={onDragEnd} sensors={sensors}>{children}</DndContext>
}

export default KanbanBoard
