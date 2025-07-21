import { TFunction } from 'i18next'

export const getPasswordRules = (t: TFunction) => [
    { text: t('common.passwordRules.lowercase'), regex: /[a-z]/ },
    { text: t('common.passwordRules.uppercase'), regex: /[A-Z]/ },
    { text: t('common.passwordRules.length'), regex: (password: string) => password.length >= 8 },
    { text: t('common.passwordRules.special'), regex: /[!@#$%^&*(),.?":{}|<>]/ },
    { text: t('common.passwordRules.digit'), regex: /\d/ }
]

export function arePasswordRulesMet(password: string): boolean {
    // The regex checks remain the same regardless of language
    const rules = [
        { regex: /[a-z]/ },
        { regex: /[A-Z]/ },
        { regex: (password: string) => password.length >= 8 },
        { regex: /[!@#$%^&*(),.?":{}|<>]/ },
        { regex: /\d/ }
    ]
    
    return rules.every(rule => {
        return typeof rule.regex === 'function'
            ? rule.regex(password)
            : rule.regex.test(password)
    })
}