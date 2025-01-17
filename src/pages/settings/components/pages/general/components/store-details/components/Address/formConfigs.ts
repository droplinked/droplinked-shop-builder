import * as Yup from "yup";

interface InitialValue {
    data: {
        firstName: string;
        lastName: string;
        state: string;
        country: string;
        city: string;
        zip: string;
        addressLine1: string;
        addressLine2: string | null;
    }
}
export interface IAddressInputs {
    firstName: string;
    lastName: string;
    state: string;
    country: string;
    city: string;
    zip: string;
    addressLine1: string;
    addressLine2: string | null;
}

export const formValidation = () => {
    return Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        state: Yup.string().required("State is required"),
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
        zip: Yup.string().required("Zip is required"),
        addressLine1: Yup.string().required("Address line 1 is required"),
        addressLine2: Yup.string().nullable().optional(),
    });
}

export const initialValues = ({ data }: InitialValue) => {
    const { addressLine1, addressLine2, city, country, zip, state, firstName, lastName } = data ?? {}
    return {
        firstName: firstName || "",
        lastName: lastName || "",
        state: state || "",
        country: country || "",
        city: city || "",
        zip: zip || "",
        addressLine1: addressLine1 || "",
        addressLine2: addressLine2 || "",
    }
}