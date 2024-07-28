import { DisplayedCompany } from '@/pages'
import { useTable } from '@refinedev/core'
import { Input } from 'antd'
import { Search } from 'lucide-react'
import { useState, type FC } from 'react'

interface Props {
    setFilters: ReturnType<typeof useTable<DisplayedCompany>>['setFilters']
}

const TableFilter: FC<Props> = ({ setFilters }) => {
    const [searchKeyword, setSearchKeyword] = useState<string | undefined>('')

    const onSearch = () => {
        setFilters([
            {
                field: 'name',
                operator: 'contains',
                value: searchKeyword,
            },
        ])
    }

    return (
        <div className='flex gap-2'>
            <div className='flex items-center gap-4'>
                <Input
                    placeholder='company name'
                    size='large'
                    className='w-[200px]'
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            onSearch()
                        }
                    }}
                />
                <Search
                    onClick={onSearch}
                    className='cursor-pointer'
                />
            </div>
        </div>
    )
}

export default TableFilter
