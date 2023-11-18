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
    templateID?: string
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

export interface ImockupGeneratorService {
    params: {
        variant_ids: any
        format: string
        product_template_id: string
        technique: string
    }
    productID: string
}

export interface IpodCategoryService {
    mainCategoryId?: string
}

export interface IpodCategoryProductService {
    subCategoryId: string
}