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
