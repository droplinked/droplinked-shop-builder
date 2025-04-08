import { convertMBtoBytes } from 'utils/helpers';
import AppErrors from 'utils/constants/errors';

const UploadImageModel = ({
    size: (file: any) => {
        if (file.size > convertMBtoBytes(5)) throw Error(AppErrors.store.sizeLimit({ fieldName: "Image", size: `5MB` }));
    },

    type: (file: any) => {
        if (!["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/jpg"].includes(file.type)) throw Error(AppErrors.product.imageTypeNotSupported)
    },

    validate: (file: any) => {
        UploadImageModel.size(file)
        UploadImageModel.type(file)
    }
})

export default UploadImageModel