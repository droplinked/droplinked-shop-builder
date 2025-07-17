import { Flex, IconButton } from '@chakra-ui/react';
import Drop3Logo from 'assets/brand-identity/Drop3';
import DroplinkedLogo from 'assets/brand-identity/DroplinkedLogo';
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography';
import { Refresh2Sm } from 'assets/icons/Action/Refresh2/Refresh2Sm';
import { SidebarcollapseMd } from 'assets/icons/Action/SidebarCollapse/SidebarcollapseMd';
import { SidebarexpandMd } from 'assets/icons/Action/SidebarExpand/SidebarexpandMd';
import AppSelect from 'components/redesign/select/AppSelect';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
}

/**
 * Expanded sidebar header with logo, controls and page selector
 */
export function ExpandedHeader({ toggleSidebar }: HeaderProps): React.ReactElement {
  const { t ,isRTL} = useLocaleResources('storefront-designer');

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Flex mb="16px" justifyContent="space-between" width="100%">
        <Flex alignItems="center" gap="12px" cursor="pointer">
          <DroplinkedLogo width="32px" height="32px" color="#2BCFA1" />
          <DroplinkedTypography height="24px" color="#2BCFA1"/>
        </Flex>
        <Flex gap={2}>
          <IconButton
            aria-label="Refresh Customizations"
            icon={<Refresh2Sm width="16px" height="16px" />}
            backgroundColor="neutral.gray.900"
            color="white"
            _hover={{ backgroundColor: '#222' }}
          />
          <IconButton
            aria-label="Toggle Sidebar"
            icon={isRTL ? <SidebarexpandMd /> : <SidebarcollapseMd />}
            onClick={toggleSidebar}
            _hover={{ backgroundColor: '#222' }}
            backgroundColor="neutral.gray.900"
            color="white"
          />
        </Flex>
      </Flex>
      <AppSelect
        items={[t('DesignerSidebar.common.pageSelector')]}
        selectProps={{
          width: '100%',
          onChange: () => {},
          color: 'neutral.white'
        }}
      />
    </Flex>
  );
}

/**
 * Collapsed sidebar header with logo and expand button
 */
export function CollapsedHeader({ toggleSidebar }: HeaderProps): React.ReactElement {
  const { isRTL } = useLocaleResources('storefront-designer');

  return (
    <Flex direction="column" alignItems="center" gap="24px" mb="24px">
      <Drop3Logo width="32px" height="32px" color="#2BCFA1" />
      <IconButton
        aria-label="Toggle Sidebar"
        icon={isRTL ? <SidebarcollapseMd /> : <SidebarexpandMd />}
        onClick={toggleSidebar}
        backgroundColor="neutral.gray.900"
        color="white"
        _hover={{ backgroundColor: '#222' }}
      />
    </Flex>
  );
}
