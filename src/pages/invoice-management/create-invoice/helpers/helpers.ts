import * as Yup from 'yup';

export interface Address {
    _id: string;
    easyPostAddressID: string;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    city: string;
    state: string;
    zip: number;
    addressType: string;
    phoneNumber: string;
}

export interface InvoiceFormSchema {
    email: string;
    note: string;
    address: Address;
}

export function getInvoiceValidationSchema(isAddressSwitchToggled: boolean, t: (key: string, options?: any) => string) {
    return Yup.object({
        email: Yup.string().email(t('validation.invalidEmail')).required(t('validation.emailRequired')),
        note: Yup.string(),
        address: Yup.object().shape({
            firstName: Yup.string().required(t('validation.firstNameRequired')),
            lastName: Yup.string().required(t('validation.lastNameRequired')),
            addressLine1: Yup.string().when([], {
                is: () => isAddressSwitchToggled,
                then: schema => schema.required(t('validation.addressLine1Required')),
                otherwise: schema => schema
            }),
            addressLine2: Yup.string(),
            country: Yup.string().when([], {
                is: () => isAddressSwitchToggled,
                then: schema => schema.required(t('validation.countryRequired')),
                otherwise: schema => schema
            }),
            city: Yup.string().when([], {
                is: () => isAddressSwitchToggled,
                then: schema => schema.required(t('validation.cityRequired')),
                otherwise: schema => schema
            }),
            state: Yup.string().when([], {
                is: () => isAddressSwitchToggled,
                then: schema => schema.required(t('validation.stateRequired')),
                otherwise: schema => schema
            }),
            zip: Yup.string().when([], {
                is: () => isAddressSwitchToggled,
                then: schema => schema.required(t('validation.zipRequired')),
                otherwise: schema => schema
            }),
            addressType: Yup.string(),
            phoneNumber: Yup.string()
        })
    })
}

export function getInvoiceFormInitialValues(data: any) {
    return {
        email: data.email ?? '',
        note: data.note ?? '',
        address: {
            firstName: data.address?.firstName ?? '',
            lastName: data.address?.lastName ?? '',
            addressLine1: data.address?.addressLine1 ?? '',
            addressLine2: data.address?.addressLine2 ?? '',
            country: data.address?.country ?? '',
            city: data.address?.city ?? '',
            state: data.address?.state ?? '',
            zip: data.address?.zip ?? '',
            addressType: 'CUSTOMER',
            phoneNumber: data.address?.phoneNumber ?? ''
        }
    }
}

export function findSelectedShippingMethod(shippings) {
    for (const shippingGroup of shippings) {
        const selectedShippingMethod = shippingGroup.data.find(shipping => shipping.selected)
        if (selectedShippingMethod) {
            return { groupId: shippingGroup.groupId, shipmentId: selectedShippingMethod.id }
        }
    }
    return null
}