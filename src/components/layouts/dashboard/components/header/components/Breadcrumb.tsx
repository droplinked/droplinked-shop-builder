import { Flex } from '@chakra-ui/react';
import { ChevronrightMd } from 'assets/icons/Navigation/ChevronRight/ChevronrightMd';
import { ChevronrightSm } from 'assets/icons/Navigation/ChevronRight/ChevronrightSm';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SIDEBAR_CONSTANTS } from '../../../constants';

const Breadcrumb = ({ isMobile = false }) => {
  const { pathname } = useLocation();

  // Find breadcrumb items based on current pathname
  const getBreadcrumbItems = () => {
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

  const breadcrumbItems = getBreadcrumbItems();

  // Don't render anything if no matches found
  if (breadcrumbItems.length === 0) {
    return null;
  }

  // Skip the first item in breadcrumbItems
  const displayedItems = breadcrumbItems.slice(1);

  return (
    <Flex
      width="100%"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      flexWrap={isMobile ? 'wrap' : 'nowrap'}
      gap="12px"
    >
      {displayedItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (isMobile ? <ChevronrightSm color="#B1B1B1" /> : <ChevronrightMd color="#B1B1B1" />)}
          <AppTypography
            textAlign="left"
            fontSize={isMobile ? '14px' : '16px'}
            fontWeight={index === displayedItems.length - 1 ? (isMobile ? '500' : '700') : '400'}
            color={index === displayedItems.length - 1 ? 'white' : 'text.subtext.placeholder.light'}
          >
            {item.title}
          </AppTypography>
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default Breadcrumb;
