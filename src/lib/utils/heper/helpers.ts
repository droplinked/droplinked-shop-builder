export const capitalizeFirstLetter = (value: string) => {
    if (!value) return ""
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

interface ItoMb {
    value: number
}
export const toMb = ({ value }: ItoMb) => {
    return value * 1024 * 1024
}