import { useState, type FC } from 'react'
import Text from './Text'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from '../ui/input'

interface Props {
    label: string
    onFilter: (value: string) => void
}

const TableDataFilter: FC<Props> = ({ label, onFilter }) => {
    const [filterPopoverOpen, setFilterPopoverOpen] = useState<boolean>(false)

    return (
        <div className='flex items-center justify-between'>
            <Text strong>{label}</Text>
            <Popover
                open={filterPopoverOpen}
                onOpenChange={setFilterPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        size='small'
                        className='p-0'
                        icon={<SearchOutlined className='text-xs size-3 opacity-40' />}
                    />
                </PopoverTrigger>
                <PopoverContent className='px-2 py-1.5 bg-gray-100 rounded-2xl w-80'>
                    <Input
                        className='border-none outline-none rounded-xl'
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                onFilter(e.currentTarget.value)
                                setFilterPopoverOpen(false)
                            }
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default TableDataFilter
