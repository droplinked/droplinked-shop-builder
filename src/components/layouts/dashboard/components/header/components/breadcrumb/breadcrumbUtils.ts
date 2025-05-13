import { SIDEBAR_CONSTANTS } from '../../../../constants';

export interface BreadcrumbItem {
  title: string;
  linkTo: string | null;
}

/**
 * Find breadcrumb items based on current pathname for dashboard pages from sidebar constants
 */
export const getDashboardBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
  for (const group of SIDEBAR_CONSTANTS) {
    for (const item of group.items) {
      // Direct match for main item
      if (item.linkTo === pathname) {
        return [
          { title: group.group, linkTo: null },
          { title: item.title, linkTo: item.linkTo },
        ];
      }

      // Check submenu items
      if (item.list?.length > 0) {
        for (const subItem of item.list) {
          if (subItem.linkTo === pathname) {
            return [
              { title: group.group, linkTo: null },
              { title: item.title, linkTo: item.linkTo },
              { title: subItem.listTitle, linkTo: subItem.linkTo },
            ];
          }
        }
      }
    }
  }
  return [];
};

/**
 * Generate breadcrumb items from URL path for non-dashboard (standalone) pages
 */
export const getNonDashboardBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(segment => segment !== '');
  const breadcrumbItems: BreadcrumbItem[] = [];

  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Format the segment title (capitalize first letter, replace hyphens with spaces)
    const title = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '); 
    
    breadcrumbItems.push({
      title,
      linkTo: index < segments.length - 1 ? currentPath : null // Only make intermediate paths linkable
    });
  });
  
  return breadcrumbItems;
};
