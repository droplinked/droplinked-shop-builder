export interface NavLink {
    label: string;
    path: string;
}

export const navLinks: NavLink[] = [
    { label: 'Home', path: '/producer' },
    { label: 'Dashboard', path: '/producer/dashboard' },
    { label: 'Settings', path: '/producer/settings' },
    { label: 'Reports', path: '/producer/reports' }
]