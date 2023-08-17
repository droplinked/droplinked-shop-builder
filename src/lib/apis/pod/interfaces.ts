import { IProductPosition } from "../product/interfaces"

export interface IproviderIDService {
    prodviderID: string
}

export interface IpodProductService {
    pod_blank_product_id: string
}

export interface IpodVariantsService {
    provider: string
    productId: string
}

export interface IpodAvailableVariantsService {
    provider: string
    productId: string
}

export interface IpodPrintPositionsService {
    provider: string
    productId: string
}

interface Ifiles {
    placement: String
    image_url: String
    position: IProductPosition
}

export interface IpodGenerateMockupService {
    productId: string
    params: {
        variant_ids: Array<number>,
        files: Array<Ifiles>
    }
}