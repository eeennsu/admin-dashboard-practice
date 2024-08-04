import dayjs from 'dayjs'

export const getSchedule = (startDate: string, endDate: string): string => {
    const start = dayjs(startDate)
    const end = dayjs(endDate)

    return `${start.format('YYYY-MM-DD - HH:mm')} ~ ${end.format('YYYY-MM-DD - HH:mm')}`
}

export const getYearAndMonth = (stringDate: string): string => {
    const date = dayjs(stringDate)

    return date.format('YY년 M월')
}

export const getDate = (stringDate: string): string => {
    const date = dayjs(stringDate)

    return date.format('YY.MM.DD')
}

type DateColors = 'success' | 'processing' | 'error' | 'default' | 'warning'

//  returns a color based on the date
export const getDateColor = (args: { date: string; defaultColor?: DateColors }): DateColors => {
    const date = dayjs(args.date)
    const today = dayjs()

    if (date.isBefore(today)) {
        return 'error'
    }

    if (date.isBefore(today.add(3, 'day'))) {
        return 'warning'
    }

    if (date.isSame(today, 'day')) {
        return 'processing'
    }

    if (date.isAfter(today, 'day')) {
        return 'success'
    }

    return args.defaultColor ?? 'default'
}
