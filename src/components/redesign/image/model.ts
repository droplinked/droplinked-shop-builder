import { convertMBtoBytes } from "utils/helpers";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

const UploadImageModel = () => {
    const { t } = useLocaleResources('common');
    
    return {
        size: (file: any) => {
            if (file.size > convertMBtoBytes(5)) throw Error(t('errors.imageSizeLimit', { size: '5MB' }));
        },

        type: (file: any) => {
            if (!["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/jpg"].includes(file.type)) throw Error(t('errors.imageTypeNotSupported'))
        },

        validate: (file: any) => {
            UploadImageModel().size(file)
            UploadImageModel().type(file)
        }
    }
}

export default UploadImageModel
