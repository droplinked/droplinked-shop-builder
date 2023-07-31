import { toMb } from "lib/utils/heper/helpers";
import AppErrors from "lib/utils/statics/errors/errors";

export default class UploadImageModel {
    private static size = (file: any) => {
        if (file.size > toMb({ value: 5 })) throw Error(AppErrors.store.size_limit({ fieldName: "Image", size: `5MB` }));
    }

    private static type = (file: any) => {
        if (!["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/jpg"].includes(file.type)) throw Error(AppErrors.product.product_image_type_not_supported)
    }

    static validate = (file: any) => {
        this.size(file)
        this.type(file)
    }
}