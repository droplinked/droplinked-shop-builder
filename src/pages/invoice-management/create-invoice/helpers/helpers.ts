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
            phoneNumber: Yup.string().required("Phone Number is required"),
        })
    })
}

export function getInvoiceFormInitialValues(invoiceId: string | undefined, data: any) {
    return {
        email: invoiceId ? data.email : '',
        note: invoiceId ? data.note ?? '' : '',
        address: {
            firstName: invoiceId ? data.address?.firstName : '',
            lastName: invoiceId ? data.address?.lastName : '',
            addressLine1: invoiceId ? data.address?.addressLine1 : '',
            addressLine2: invoiceId ? data.address?.addressLine2 : '',
            country: invoiceId ? data.address?.country : '',
            city: invoiceId ? data.address?.city : '',
            state: invoiceId ? data.address?.state : '',
            zip: invoiceId ? data.address?.zip : '',
            addressType: 'CUSTOMER',
            phoneNumber: invoiceId ? data.address?.phoneNumber : ''
        }
    } as InvoiceFormSchema
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