export function readTsv<T>(content: string, lineListFn: (line: string[]) => T) {
    let position = 0
    const result: T[] = []
    while (true) {
        const returnIndex = content.indexOf('\n', position)
        if (returnIndex === -1) break
        const line = content.substring(position, returnIndex).split('\t')
        result.push(lineListFn(line))
        position = returnIndex + 1
    }
    return result
}

export function readTsvAsMap(content: string) {
    let position = 0
    const result: Map<string, string> = new Map()
    while (true) {
        const returnIndex = content.indexOf('\n', position)
        if (returnIndex === -1) break
        const line = content.substring(position, returnIndex).split('\t')
        result.set(line[0], line[1])
        position = returnIndex + 1
    }
    return result
}