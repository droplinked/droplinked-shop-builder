import * as Yup from 'yup';

export interface ISettings {
    name: string;
    email: string;
    pre_purchase_data_fetch: string;
    isAgeRestricted: boolean;
    currencyAbbreviation: string;
}

export const settingsPageSchema = Yup.object().shape({
    name: Yup.string().required('Please provide a name for shop'),
    email: Yup.string().email().typeError("Please provide a valid email.").required('Please provide a valid email.'),
    pre_purchase_data_fetch: Yup.string().nullable().optional(),
    isAgeRestricted: Yup.boolean().nullable().optional(),
    currencyAbbreviation: Yup.string().nullable().required('Please select a currency'),
});

export const getSettingsPageInitValues = (shopData, userData) => {
    const { name, pre_purchase_data_fetch, isAgeRestricted, currency } = shopData;
    const { email } = userData;
    return ({
        name: name || '',
        pre_purchase_data_fetch: pre_purchase_data_fetch || '',
        isAgeRestricted: isAgeRestricted || false,
        email: email || '',
        currencyAbbreviation: currency?.abbreviation || null
    })
}