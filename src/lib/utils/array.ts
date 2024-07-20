export const getEmptyArray = (size = 5) => {
    return Array.from({ length: size }).map((_, i) => ({
        id: i,
    }))
}

export const isEmptyArray = (array?: unknown[]) => {
    return !Array.isArray(array) || array.length === 0
}
