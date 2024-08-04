import type { FC, PropsWithChildren } from 'react'

const KanbanBoardContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='w-[calc(100%+64px)] h-[calc(100vh-64px)] flex justify-center -m-8'>
            <div className='flex p-8 overflow-scroll size-full'>{children}</div>
        </div>
    )
}

export default KanbanBoardContainer
