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

export const getMinMaxArray = (arr) => {
    let min = arr[0];
    let max = arr[0];
    let i = arr.length;

    while (i--) {
        min = arr[i] < min ? arr[i] : min;
        max = arr[i] > max ? arr[i] : max;
    }
    return { min, max };
}

export const getPercentage = (number: number, max: number) => (number * 100) / max