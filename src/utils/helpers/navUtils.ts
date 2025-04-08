// Determines the user’s next page based on their account status
export const navigateUserBasedOnStatus = (status: string, data: any) => {
    switch (status) {
        case "NEW":
            return { href: "/onboarding?entry=email-confirmation", dashboard: false }
        case "VERIFIED":
            return { href: "/onboarding?entry=store-details", dashboard: false }
        case "PROFILE_COMPLETED":
            return { href: "/onboarding?entry=store-details", dashboard: false }
        case "SHOP_INFO_COMPLETED":
            return { href: "dashboard", dashboard: true }
        case "IMS_TYPE_COMPLETED":
            return { href: "dashboard", dashboard: true }
        case "ACTIVE":
            return { href: "dashboard", dashboard: true }
        default:
            return { href: "", dashboard: false }
    }
}
