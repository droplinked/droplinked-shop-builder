export const passwordRules = [
    { text: "One lowercase letter", regex: /[a-z]/ },
    { text: "One uppercase letter", regex: /[A-Z]/ },
    { text: "8 characters or more", regex: (password: string) => password.length >= 8 },
    { text: "One special character", regex: /[!@#$%^&*(),.?":{}|<>]/ },
    { text: "One digit", regex: /\d/ }
]

export function arePasswordRulesMet(password: string): boolean {
    return passwordRules.every(rule => {
        return typeof rule.regex === 'function'
            ? rule.regex(password)
            : rule.regex.test(password)
    })
}