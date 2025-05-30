import * as Yup from 'yup';
import i18next from 'i18next';

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

export const createSettingsPageSchema = (t) => Yup.object().shape({
    name: Yup.string().required(t('settings.validation.nameRequired')),
    email: Yup.string().email().typeError(t('settings.validation.emailValid')).required(t('settings.validation.emailRequired')),
    pre_purchase_data_fetch: Yup.string().nullable().optional(),
    isAgeRestricted: Yup.boolean().nullable().optional(),
    currencyAbbreviation: Yup.string().nullable().required(t('settings.validation.currencyRequired')),
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
        pre_purchase_data_fetch: pre_purchase_data_fetch?.title || '',
        isAgeRestricted: isAgeRestricted || false,
        email: email || '',
        currencyAbbreviation: currency?.abbreviation || null,
        paymentMethods: paymentMethods || [],
        paymentWallets: paymentWallets || [],
        loginMethods: loginMethods || []
    })
}