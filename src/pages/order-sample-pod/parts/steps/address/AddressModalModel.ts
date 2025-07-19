import { IcreateAddressService } from 'services/address/interfaces';
import * as Yup from 'yup';

interface IinitialValues {
    address: IcreateAddressService | null
}

const AddressModalModel = ({
    initialValues: ({ address }: IinitialValues): IcreateAddressService => {
        return {
            firstName: address?.firstName ?? '',
            lastName: address?.lastName ?? '',
            addressLine1: address?.addressLine1 ?? '',
            addressLine2: address?.addressLine2 ?? '',
            country: address?.country ?? '',
            city: address?.city ?? '',
            state: address?.state ?? '',
            zip: address?.zip ?? '',
            addressType: 'SHOP'
        }
    },

    formSchema: (t: (key: string) => string) => {
        return Yup.object().shape({
            firstName: Yup.string().required(t('common:required')),
            lastName: Yup.string().required(t('common:required')),
            addressLine1: Yup.string().required(t('common:required')),
            state: Yup.string().required(t('common:required')),
            country: Yup.string().required(t('common:required')),
            city: Yup.string().required(t('common:required')),
            zip: Yup.string().required(t('common:required')),
        });
    }
})

export default AddressModalModel