import type { DefaultOptionType } from 'antd/es/select'
import { cn } from './shadcn';

export const selectGenerator = (obj: Record<string, string>, labelClassName?: string): DefaultOptionType[] => {
    const entries = Object.entries(obj)

    return entries.map<DefaultOptionType>(([key, value]) => ({
        label: <div className={cn('capitalize', labelClassName)}>{key}</div>,
        value,
    }))
}
