import * as XLSX from 'xlsx'

export const parseShippingFileData = (arrayBuffer: ArrayBufferLike): any => {
    const data = new Uint8Array(arrayBuffer)
    const workbook = XLSX.read(data, { type: 'array' })

    const groupsSheet = workbook.Sheets['Groups']
    const shippingGroups = XLSX.utils.sheet_to_json(groupsSheet)

    const rulesSheet = workbook.Sheets['Services']
    const shippingRules = XLSX.utils.sheet_to_json(rulesSheet)

    const rates = shippingRules.map((rule) => {
        const group = shippingGroups.find(
            (group) => group['Shipping Groups'] === rule['Shipping Groups']
        )

        return {
            name: rule['Service Name'],
            pricePerUnit:
                rule[`Price (USD) Per KG`] ||
                rule[`Price (USD) per Package Size`],
            estimatedDeliveryDate: rule['Estimated Delivary Date'],
            countries: group
                ? group['Countries'].split(',').map((country) => country.trim())
                : [],
            groupName: group ? group['Shipping Groups'] : '',
        }
    })

    let createShippingDto: any = {
        calculateBasedOnUnit: rates.some((rate) => rate.pricePerUnit) ? 'WEIGHT' : 'SIZE',
        rates,
        isActive: true,
    }

    if (shippingRules.some((rule) => rule[`Price (USD) Per KG`] !== undefined))
        createShippingDto.weightUnit = 'KG'

    if (shippingRules.some((rule) => rule[`Price (USD) per Package Size`] !== undefined))
        createShippingDto.sizeUnit = 'CM'

    return createShippingDto
}