import * as Yup from 'yup';

export interface ISettings {
    name: string;
    email: string;
    pre_purchase_data_fetch: string;
    isAgeRestricted: boolean;
    currencyAbbreviation: string;
    paymentMethods: {
        type: string;
        isActive: boolean;
    }[];
    paymentWallets: {
        type: string;
        destinationAddress: {
            destinationAddress: string;
            percent: number
        }[]
    }[]
    loginMethods: {
        name: string;
        isActivated: boolean;
        type: string;
    }[]
}

export const settingsPageSchema = Yup.object().shape({
    name: Yup.string().required('Please provide a name for shop'),
    email: Yup.string().email().typeError("Please provide a valid email.").required('Please provide a valid email.'),
    pre_purchase_data_fetch: Yup.string().nullable().optional(),
    isAgeRestricted: Yup.boolean().nullable().optional(),
    currencyAbbreviation: Yup.string().nullable().required('Please select a currency'),
    paymentMethods: Yup.array().of(
        Yup.object().shape({
            type: Yup.string().required(),
            isActive: Yup.boolean().required()
        })
    ).nullable().optional(),
    paymentWallets: Yup.array().of(
        Yup.object().shape({
            type: Yup.string().required(),
            destinationAddress: Yup.array().of(
                Yup.object().shape({
                    destinationAddress: Yup.string().optional(),
                    percent: Yup.number().optional()
                })
            )
        })
    ).nullable().optional(),
    loginMethods: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required(),
            isActivated: Yup.boolean().required(),
            type: Yup.string().required()
        })
    ).nullable().optional(),
});

export const getSettingsPageInitValues = (shopData, userData) => {
    const { name, pre_purchase_data_fetch, isAgeRestricted, currency, paymentMethods, loginMethods, paymentWallets } = shopData;
    const { email } = userData;

    return ({
        name: name || '',
        pre_purchase_data_fetch: pre_purchase_data_fetch || '',
        isAgeRestricted: isAgeRestricted || false,
        email: email || '',
        currencyAbbreviation: currency?.abbreviation || null,
        paymentMethods: paymentMethods || [],
        paymentWallets: paymentWallets || [],
        loginMethods: loginMethods || []
    })
}