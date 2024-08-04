import BoardCard from '@/components/task/board/BoardCard'
import KanbanBoard from '@/components/task/kanban/KanbanBoard'
import KanbanBoardContainer from '@/components/task/kanban/KanbanBoardContainer'
import KanbanColumn from '@/components/task/kanban/KanbanColumn'
import KanbanItem from '@/components/task/kanban/KanbanItem'
import { TASK_STAGES_QUERY, TASKS_QUERY } from '@/graphql/queries'
import { TasksQuery, TaskStagesQuery } from '@/graphql/types'
import { useList } from '@refinedev/core'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { useMemo, type FC } from 'react'

export const TaskListPage: FC = () => {
    const { data: stagesData, isLoading: isLoadingStages } = useList<GetFieldsFromList<TaskStagesQuery>>({
        resource: 'taskStages',
        filters: [
            {
                field: 'title',
                operator: 'in',
                value: ['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE'],
            },
        ],
        sorters: [
            {
                field: 'createdAt',
                order: 'asc',
            },
        ],
        meta: {
            gqlQuery: TASK_STAGES_QUERY,
        },
    })

    const { data: tasksData, isLoading: isTasksLoading } = useList<GetFieldsFromList<TasksQuery>>({
        resource: 'tasks',
        sorters: [
            {
                field: 'dueDate',
                order: 'asc',
            },
        ],
        queryOptions: {
            enabled: !!stagesData,
        },
        pagination: {
            mode: 'off',
        },
        meta: {
            gqlQuery: TASKS_QUERY,
        },
    })

    const tasksStages = useMemo(() => {
        if (!tasksData?.data || !stagesData?.data) {
            return {
                unassignedStage: [],
                stages: [],
            }
        }

        const unassignedStage = tasksData.data.filter((task) => task.stageId === null)

        const grouped = stagesData.data.map((stage) => ({
            ...stage,
            tasks: tasksData.data.filter((task) => task.stageId?.toString() === stage.id),
        }))

        return {
            unassignedStage,
            stages: grouped,
        }
    }, [stagesData, tasksData])

    const onAddCard = ({ stageId }: { stageId: string }) => {
        console.log('Add Card')
    }

    console.log({ tasksStages })

    return (
        <>
            <KanbanBoardContainer>
                <KanbanBoard>
                    <KanbanColumn
                        id='unassigned'
                        title='Unassigned'
                        count={tasksStages?.unassignedStage?.length || 0}
                        onAddTask={() => onAddCard({ stageId: 'unassigned' })}>
                        {tasksStages?.unassignedStage?.map((unassignedTask) => (
                            <KanbanItem
                                key={unassignedTask.id}
                                id={unassignedTask.id}
                                data={{ ...unassignedTask, stageId: 'unassigned' }}>
                                <BoardCard
                                    {...unassignedTask}
                                    dueDate={unassignedTask.dueDate || undefined}
                                />
                            </KanbanItem>
                        ))}
                    </KanbanColumn>
                    {/* <KanbanColumn
                        id='todo'
                        title='TODO'
                        count={tasksStages.stages.}
                    >

                    </KanbanColumn> */}
                </KanbanBoard>
            </KanbanBoardContainer>
        </>
    )
}
