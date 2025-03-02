// Determines the user’s next page based on their account status
export const navigateUserBasedOnStatus = (status: string, data: any) => {
    switch (status) {
        case "NEW":
            localStorage.setItem("registerEmail", JSON.stringify(data.user.email));
            return { href: "/email-confirmation", dashboard: false };
        case "VERIFIED":
            return { href: "registration", dashboard: true };
        case "PROFILE_COMPLETED":
            return { href: "registration", dashboard: true };
        case "SHOP_INFO_COMPLETED":
            return { href: "dashboard", dashboard: true };
        case "IMS_TYPE_COMPLETED":
            return { href: "dashboard", dashboard: true };
        case "ACTIVE":
            return { href: "dashboard", dashboard: true };
        default:
            return { href: "", dashboard: false };
    }
};
