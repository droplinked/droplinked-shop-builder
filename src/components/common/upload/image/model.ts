import { toMb } from "lib/utils/heper/helpers";
import AppErrors from "lib/utils/statics/errors/errors";

const UploadImageModel = ({
    size: (file: any) => {
        if (file.size > toMb({ value: 5 })) throw Error(AppErrors.store.size_limit({ fieldName: "Image", size: `5MB` }));
    },

    type: (file: any) => {
        if (!["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/jpg"].includes(file.type)) throw Error(AppErrors.product.product_image_type_not_supported)
    },

    validate: (file: any) => {
        UploadImageModel.size(file)
        UploadImageModel.type(file)
    }
})

export default UploadImageModel
