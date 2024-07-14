export const extractNameInitials = (name?: string, minLength = 2) => {
    if (!name) return ''

    const initials = name
        .split(' ')
        .map((name) => name.at(0))
        .join()

    const filtered = initials.replace(/[^a-zA-Z]/g, '')

    return filtered.slice(0, minLength).toUpperCase()
}
