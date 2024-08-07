import KanbanSkeleton from '@/components/skeletons/KanbanSkeleton'
import BoardCard from '@/components/task/board/BoardCard'
import KanbanAddCardButton from '@/components/task/kanban/KanbanAddCardButton'
import KanbanBoard from '@/components/task/kanban/KanbanBoard'
import KanbanBoardContainer from '@/components/task/kanban/KanbanBoardContainer'
import KanbanColumn from '@/components/task/kanban/KanbanColumn'
import KanbanItem from '@/components/task/kanban/KanbanItem'
import { UPDATE_TASK_STAGE_MUTATION } from '@/graphql/mutations'
import { TASK_STAGES_QUERY, TASKS_QUERY } from '@/graphql/queries'
import { TasksQuery, TaskStagesQuery } from '@/graphql/types'
import { DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useList, useUpdate } from '@refinedev/core'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { PropsWithChildren, useMemo, type FC } from 'react'

export const TaskListPage: FC<PropsWithChildren> = ({ children }) => {
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

        const stagesWithTasks = stagesData.data.map((stage) => ({
            ...stage,
            tasks: tasksData.data.filter((task) => task.stageId?.toString() === stage.id),
        }))

        return {
            unassignedStage,
            stages: stagesWithTasks,
        }
    }, [stagesData, tasksData])

    const { mutate: mutateEditTask } = useUpdate()

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
            delay: 250,
            tolerance: 5,
        },
    })

    const touchSensor = useSensor(TouchSensor)

    const sensors = useSensors(mouseSensor, touchSensor)

    const handleAddCard = ({ stageId }: { stageId: string }) => {
        console.log('Add Card')
    }

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        let droppedStageId = over?.id as null | string | undefined
        const activeStageId = active.id

        const activeData = active?.data?.current as GetFieldsFromList<TasksQuery>

        if (activeData.stageId === droppedStageId) {
            return
        }

        if (droppedStageId === 'unassigned') {
            console.log('Task is dropped in unassigned')
            droppedStageId = null
        }

        mutateEditTask({
            resource: 'tasks',
            id: activeStageId,
            values: {
                stageId: droppedStageId,
            },
            meta: {
                gqlMutation: UPDATE_TASK_STAGE_MUTATION,
            },
            successNotification: false,
            mutationMode: 'optimistic',
        })
    }

    const isLoading = isLoadingStages || isTasksLoading

    if (isLoading) {
        return <KanbanSkeleton />
    }

    return (
        <>
            <KanbanBoardContainer>
                <KanbanBoard
                    onDragEnd={handleDragEnd}
                    sensors={sensors}>
                    <KanbanColumn
                        id='unassigned'
                        title='Unassigned'
                        count={tasksStages?.unassignedStage?.length || 0}
                        onAddTask={() => handleAddCard({ stageId: 'unassigned' })}>
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

                        {!isLoading && tasksStages.unassignedStage.length === 0 && (
                            <KanbanAddCardButton onClick={() => handleAddCard({ stageId: 'unassigned' })} />
                        )}
                    </KanbanColumn>
                    {tasksStages.stages.map((stage) => (
                        <KanbanColumn
                            key={stage.id}
                            id={stage.id}
                            title={stage.title}
                            count={stage.tasks.length || 0}
                            onAddTask={() => handleAddCard({ stageId: stage.id })}>
                            {!isLoading &&
                                stage.tasks.map((task) => (
                                    <KanbanItem
                                        key={task.id}
                                        id={task.id}
                                        data={{ ...task, stageId: stage.id }}>
                                        <BoardCard
                                            {...task}
                                            dueDate={task.dueDate || undefined}
                                        />
                                    </KanbanItem>
                                ))}
                            {!isLoading && tasksStages.unassignedStage.length === 0 && (
                                <KanbanAddCardButton onClick={() => handleAddCard({ stageId: stage.id })} />
                            )}
                        </KanbanColumn>
                    ))}
                </KanbanBoard>
            </KanbanBoardContainer>
            {children}
        </>
    )
}
