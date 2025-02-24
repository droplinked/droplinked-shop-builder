export interface IpodProductService {
    pod_blank_product_id: string
}

export interface IpodAvailableVariantsService {
    provider: string
    productId: string
    templateID?: string
}

export interface ImockupGeneratorService {
    params: {
        variant_ids: any
        format: string
        product_template_id: number
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

export interface PODCategory {
    id: number
    parent_id: number
    image_url: string
    catalog_position: number
    size: string
    title: string
    sub_categories?: PODCategory[]
}