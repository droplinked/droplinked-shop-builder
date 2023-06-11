export const capitalizeFirstLetter = (value: string) => {
    if (!value) return ""
    return value.split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase()).join(" ")
}

interface ItoMb {
    value: number
}
export const toMb = ({ value }: ItoMb) => {
    return value * 1024 * 1024
}