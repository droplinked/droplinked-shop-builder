import { TFunction } from 'i18next'
import { digitRegex, lowercaseRegex, specialCharRegex, uppercaseRegex } from 'utils/helpers/regexUtils'

export const getPasswordRules = (t: TFunction) => [
    { text: t('common.passwordRules.lowercase'), regex: lowercaseRegex },
    { text: t('common.passwordRules.uppercase'), regex: uppercaseRegex },
    { text: t('common.passwordRules.length'), regex: (password: string) => password.length >= 8 },
    { text: t('common.passwordRules.special'), regex: specialCharRegex },
    { text: t('common.passwordRules.digit'), regex: digitRegex }
]

export function arePasswordRulesMet(password: string): boolean {
    const rules = [
        { regex: lowercaseRegex },
        { regex: uppercaseRegex },
        { regex: (password: string) => password.length >= 8 },
        { regex: specialCharRegex },
        { regex: digitRegex }
    ]

    return rules.every(rule => {
        return typeof rule.regex === 'function'
            ? rule.regex(password)
            : rule.regex.test(password)
    })
}