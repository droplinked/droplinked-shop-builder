import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronrightMd } from 'assets/icons/Navigation/ChevronRight/ChevronrightMd'
import { ChevronrightSm } from 'assets/icons/Navigation/ChevronRight/ChevronrightSm'
import { useProducerLayout } from 'context/ProducerLayoutContext'
import { producerSidebarLinks } from 'data/producerSidebarLinks'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

interface SidebarItem  {
    title: string;
    icon: any;
    linkTo?: string | null;
    list: Array<{ listTitle: string; linkTo: string }>;
    onClick?: () => void;
    external?: boolean;
};

interface SidebarGroup {
    group: string;
    items: SidebarItem[];
}

interface CustomBreadcrumbItem {
    title: string
    linkTo?: string
}

export const Breadcrumbs = () => {
    const { breakpoint } = useProducerLayout()
    const { pathname } = useLocation()

    const separator = breakpoint === 'desktop'
        ? <ChevronrightMd color='#b1b1b1' />
        : <ChevronrightSm color='#b1b1b1' />

    // Function to generate breadcrumbs based on the current path
    const getBreadcrumbs = (path: string): CustomBreadcrumbItem[] => {
        const breadcrumbs: CustomBreadcrumbItem[] = [{ title: 'Home', linkTo: '/analytics' }]

        producerSidebarLinks.forEach((group: SidebarGroup) => {
            group.items.forEach((item) => {
                // Check top-level item
                if (item.linkTo === path) {
                    breadcrumbs.push({ title: item.title, linkTo: item.linkTo })
                }

                // Check sub-items
                item.list.forEach((subItem) => {
                    if (subItem.linkTo === path) {
                        breadcrumbs.push(
                            { title: item.title }, // Parent item without link
                            { title: subItem.listTitle, linkTo: subItem.linkTo }
                        )
                    }
                })
            })
        })

        return breadcrumbs
    }

    const breadcrumbs = getBreadcrumbs(pathname)

    return (
        <Breadcrumb separator={separator}>
            {breadcrumbs
                .filter(crumb => crumb.linkTo)
                .map((crumb, index, items) => {
                    const isWhiteText = items.length === 1 || pathname === crumb.linkTo

                    return (
                        <BreadcrumbItem key={index} isCurrentPage={pathname === crumb.linkTo}>
                            <BreadcrumbLink
                                as={NavLink}
                                to={pathname !== crumb.linkTo ? crumb.linkTo : undefined}
                                fontSize={{ base: 14, md: 16, xl: 20 }}
                                fontWeight={isWhiteText ? { base: 500, md: 700 } : 400}
                                color={isWhiteText ? "text.white" : 'text.subtext.placeholder.light'}
                                cursor={isWhiteText ? 'default' : 'pointer'}
                            >
                                {crumb.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )
                })}
        </Breadcrumb>
    )
}