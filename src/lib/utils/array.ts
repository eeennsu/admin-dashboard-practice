import { DealStage } from '@/components/main/DealsChart'
import dayjs from 'dayjs'

export const getEmptyArray = (size = 5): Array<{ id: number }> => {
    return Array.from({ length: size }).map((_, i) => ({
        id: i,
    }))
}

export const isEmptyArray = (array?: unknown[]): boolean => {
    return !Array.isArray(array) || array.length === 0
}

type DealAggregate = DealStage['dealsAggregate'][0]

interface MappedDealData {
    timeUnix: number
    timeText: string
    value: number
    state: string
}

const mapDeals = (deals: DealAggregate[] = [], state: string): MappedDealData[] => {
    // filter out deals that don't have a closeDateMonth or closeDateYear
    return deals
        .filter((deal?: DealAggregate) => deal?.groupBy && deal.groupBy?.closeDateMonth && deal.groupBy?.closeDateYear)
        .map((deal) => {
            // Get the closeDateMonth and closeDateYear from the deal
            const { closeDateMonth, closeDateYear } = deal.groupBy as NonNullable<DealAggregate['groupBy']>

            // Create a date object from the closeDateMonth and closeDateYear
            const date = dayjs(`${closeDateYear}-${closeDateMonth}-01`)

            // Return the mapped deal data
            return {
                // Convert the date to a unix timestamp i.e., 1622505600000
                timeUnix: date.unix(),
                // Convert the date to a string i.e., "May 2021"
                timeText: date.format('MMM  YYYY'),
                // Get the sum of all deals in this stage
                value: deal.sum?.value ?? 0,
                state,
            }
        })
}

// Map deals data to the format required by the chart
export const mapDealsData = (dealStages?: DealStage[]) => {
    if (!dealStages) {
        return []
    }
    // Get the deal stage with the title "WON"
    const won = dealStages.find((stage) => stage.title === 'WON')
    const wonDeals = mapDeals(won?.dealsAggregate, 'Won')

    // Get the deal stage with the title "LOST"
    const lost = dealStages.find((stage) => stage.title === 'LOST')
    const lostDeals = mapDeals(lost?.dealsAggregate, 'Lost')

    // Combine the won and lost deals and sort them by time
    const converted = [...wonDeals, ...lostDeals].sort((a, b) => a.timeUnix - b.timeUnix)

    const result = converted.reduce<ChartData[]>((acc, cur) => {
        const existing = acc.find((data) => data.timeText === cur.timeText)

        if (existing) {
            if (cur.state === 'Won') {
                existing.won = cur.value
            } else {
                existing.lost = cur.value
            }
        } else {
            acc.push({
                timeText: cur.timeText,
                ...(cur.state === 'Won' && { won: cur.value }),
                ...(cur.state === 'Lost' && { lost: cur.value }),
            })
        }

        return acc
    }, [])

    return result
}

type ChartData = {
    timeText: string
    won?: number
    lost?: number
}
