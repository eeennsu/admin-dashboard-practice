import dayjs from 'dayjs'

export const getSchedule = (startDate: string, endDate: string) => {
    const start = dayjs(startDate)
    const end = dayjs(endDate)

    return `${start.format('YYYY-MM-DD - HH:mm')} ~ ${end.format('YYYY-MM-DD - HH:mm')}`
}
