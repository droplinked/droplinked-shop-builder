export const styles = {
    menuButton: {
        width: { base: "100%", md: "176px" },
        px: 4,
        py: 3,
        border: "1px solid #292929",
        borderRadius: "8px",
    },
    menuList: {
        p: 3,
        gap: 2,
        background: "#222",
        borderRadius: "8px",
        border: "none",
    },
    menuItem: {
        px: 4,
        py: 2.5,
        background: "transparent",
        _hover: {
            background: "#292929",
            borderRadius: "8px"
        }
    },
    checkbox: {
        borderColor: "#616161",
        size: "lg",
        borderRadius: "6px",
    }
} as const
