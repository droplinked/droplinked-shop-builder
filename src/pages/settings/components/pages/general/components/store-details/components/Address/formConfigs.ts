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

export const formValidation = (t: (key: string) => string) => {
    return Yup.object().shape({
        firstName: Yup.string().required(t("Address.validation.firstNameRequired")),
        lastName: Yup.string().required(t("Address.validation.lastNameRequired")),
        state: Yup.string().required(t("Address.validation.stateRequired")),
        country: Yup.string().required(t("Address.validation.countryRequired")),
        city: Yup.string().required(t("Address.validation.cityRequired")),
        zip: Yup.string().required(t("Address.validation.zipRequired")),
        addressLine1: Yup.string().required(t("Address.validation.addressLine1Required")),
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