import { IcreateAddressService } from 'lib/apis/address/interfaces';
import * as Yup from 'yup';

interface IinitialValues {
    address: IcreateAddressService | null
}

export default class AddressModalModel {
    static initialValues = ({ address }: IinitialValues): IcreateAddressService => {
        return {
            firstName: '' || address?.firstName,
            lastName: '' || address?.lastName,
            addressLine1: '' || address?.addressLine1,
            addressLine2: address?.addressLine2 ? address?.addressLine2 : '',
            country: '' || address?.country,
            city: '' || address?.city,
            state: '' || address?.state,
            zip: '' || address?.zip,
            addressType: 'SHOP'
        }
    }

    static formSchema = () => {
        return Yup.object().shape({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            addressLine1: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            zip: Yup.string().required('Required'),
        });
    }
}