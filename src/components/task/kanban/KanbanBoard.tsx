import { DndContext } from '@dnd-kit/core'
import type { FC, PropsWithChildren } from 'react'

const KanbanBoard: FC<PropsWithChildren> = ({ children }) => {
    return <DndContext>{children}</DndContext>
}

export default KanbanBoard
