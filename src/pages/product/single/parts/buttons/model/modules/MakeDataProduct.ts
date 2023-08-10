import { IproductState, Isku } from "lib/apis/product/interfaces"

interface IrefactorSku {
    skues: Array<Isku>
}

interface Iupdate {
    state: IproductState
}

const MakeDataProductModel = ({
    refactorSku: ({ skues }: IrefactorSku): Array<Isku> => {
        return skues.map((el: any) => ({
            ...el,
            dimensions: {
                height: parseInt(el?.dimensions?.height) || 0,
                length: parseInt(el?.dimensions?.length) || 0,
                width: parseInt(el?.dimensions?.width) || 0,
            },
            price: parseFloat(el?.price),
            weight: parseFloat(el?.weight),
            quantity: parseInt(el?.quantity),
            image: el?.image
        }))
    },

    update: ({ state }: Iupdate) => {
        return {
            "title": state.title,
            "description": state.description,
            "priceUnit": state.priceUnit,
            "productCollectionID": state.productCollectionID,
            "media": state.media,
            "publish_product": state.publish_product,
            "product_type": state.product_type,
            "m2m_positions": state.m2m_positions,
            "artwork": state.artwork,
            "artwork2": state.artwork2,
            "artwork_position": state.artwork_position,
            "artwork2_position": state.artwork2_position,
            "sku": state.sku,
            "pod_blank_product_id": state.pod_blank_product_id,
            "thumb": state.thumb,
            "m2m_services": state.m2m_services,
            "purchaseAvailable": state.purchaseAvailable,
        }
    }
})

export default MakeDataProductModel