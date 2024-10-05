export interface MenuItems {
    headerMenuItems: {
        label: string;
        links: {
            label: string;
            description: string;
            icon: React.JSX.Element;
            href: string;
        }[]
    }[]
}