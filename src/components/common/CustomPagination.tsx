import { useMemo, type FC, type ReactNode, type SetStateAction } from 'react'
import { PaginationContent, PaginationItem, Pagination as ShadPagination } from '@/components/ui/pagination'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { cn } from '@/lib/utils'

interface Props {
    current: number
    setCurrent: (value: SetStateAction<number>) => void
    pageCount: number
    hasPrevious: boolean
    hasNext: boolean
    maxPagesToShow?: number
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    rootClassName?: string
    contentClassName?: string
    buttonClassName?: string
}

const CustomPagination: FC<Props> = ({
    current,
    setCurrent,
    pageCount,
    hasNext,
    hasPrevious,
    maxPagesToShow = 3,
    leftIcon,
    rightIcon,
    rootClassName,
    contentClassName,
    buttonClassName,
}) => {
    const displayedPageNumbers = useMemo(() => {
        const pageNumbers: number[] = []

        let startPage = Math.max(1, current - Math.floor(maxPagesToShow / 2))
        let endPage = startPage + maxPagesToShow - 1

        if (endPage > pageCount) {
            endPage = pageCount
            startPage = Math.max(1, endPage - maxPagesToShow + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }
        return pageNumbers
    }, [current, pageCount, maxPagesToShow])

    return (
        <ShadPagination className={cn(rootClassName)}>
            <PaginationContent className={cn('flex gap-6 text-xl', contentClassName)}>
                <PaginationItem
                    className={cn(hasPrevious ? 'cursor-pointer' : 'opacity-30')}
                    onClick={() => hasPrevious && setCurrent((prev) => prev - 1)}>
                    {leftIcon || <LeftOutlined />}
                </PaginationItem>
                <div className='flex gap-3'>
                    {displayedPageNumbers.map((pageNum) => (
                        <PaginationItem
                            key={pageNum}
                            className={cn(
                                'cursor-pointer size-11 flex items-center justify-center',
                                pageNum === current && 'text-white rounded-full bg-blue-500',
                                buttonClassName
                            )}
                            onClick={() => setCurrent(pageNum)}>
                            {pageNum}
                        </PaginationItem>
                    ))}
                </div>
                <PaginationItem
                    className={cn(hasNext ? 'cursor-pointer' : 'opacity-30')}
                    onClick={() => hasNext && setCurrent((prev) => prev + 1)}>
                    {rightIcon || <RightOutlined />}
                </PaginationItem>
            </PaginationContent>
        </ShadPagination>
    )
}

export default CustomPagination
