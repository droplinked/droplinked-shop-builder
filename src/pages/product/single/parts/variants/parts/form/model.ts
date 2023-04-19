interface ImakeDataService {
    externalID: string
    height: string
    length: string
    price: string
    quantity: string
    weight: string
    width: string
}

class VariantsFormModal {
    static makeDataService = ({ externalID, height, length, price, quantity, weight, width }: ImakeDataService) => {
        return {
            dimensions: {
                height: parseFloat(height),
                length: parseFloat(length),
                width: parseFloat(width),
            },
            externalID : parseFloat(externalID),
            index: 0,
            options: [],
            price:parseFloat(price),
            record: false,
            weight: parseFloat(weight),
            quantity: parseFloat(quantity)
        }
    }
}

export default VariantsFormModal