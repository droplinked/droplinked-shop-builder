export const getOpacity = (index: number, items: any[]) => {
    const totalItems = items.length
    if (totalItems === 1) return 1
    return 1 - (index * (0.7 / (totalItems - 1)))
}

export const getColor = (index: number, items: any[], type: "inbound" | "outbound") => {
    const baseColor = type === "inbound" ? "43, 207, 161" : "255, 34, 68" // RGB values for #2BCFA1 and #F24
    return `rgba(${baseColor}, ${getOpacity(index, items)})`
}

export const createColorMap = (items, type) => {
    const colorMap = {}
    items.forEach((item, index) => {
        colorMap[item.reason] = getColor(index, items, type)
    })
    return colorMap
}


