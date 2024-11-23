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

export function getInvoiceValidationSchema(isAddressSwitchToggled: boolean) {
    return Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        note: Yup.string(),
        address: Yup.object().shape({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            addressLine1: Yup.string().when([], {
                is: () => isAddressSwitchToggled,
                then: schema => schema.required("Address Line 1 is required"),
                otherwise: schema => schema
            }),
            addressLine2: Yup.string(),
            country: Yup.string().when([], {
                is: () => isAddressSwitchToggled,
                then: schema => schema.required("Country is required"),
                otherwise: schema => schema
            }),
            city: Yup.string().when([], {
                is: () => isAddressSwitchToggled,
                then: schema => schema.required("City is required"),
                otherwise: schema => schema
            }),
            state: Yup.string().when([], {
                is: () => isAddressSwitchToggled,
                then: schema => schema.required("State is required"),
                otherwise: schema => schema
            }),
            zip: Yup.string().when([], {
                is: () => isAddressSwitchToggled,
                then: schema => schema.required("Zip Code is required"),
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