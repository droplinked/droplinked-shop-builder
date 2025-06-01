import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppSelect from 'components/redesign/select/AppSelect';
import useLocaleResources from '../../../../../../hooks/useLocaleResources/useLocaleResources';
import localEn from '../../../../../../locales/storefront/en.json';
import localAr from '../../../../../../locales/storefront/ar.json';

/**
 * Props for header components
 */
interface HeaderProps {
  toggleSidebar: () => void;
}

/**
 * Expanded sidebar header with logo, controls and page selector
 */
export function ExpandedHeader({ toggleSidebar }: HeaderProps): React.ReactElement {
  const { t } = useLocaleResources('storefront', { en: localEn, ar: localAr });

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Flex mb="16px" justifyContent="space-between" width="100%">
        <Flex alignItems="center" gap="12px" cursor="pointer">
          <AppIcons.SidebarDroplinked width="32px" height="32px" aria-label={t('designerSidebar.common.droplinked.logo')} />
          <AppIcons.SidebarDroplinked1 height="24px" color="#2BCFA1" aria-label={t('designerSidebar.common.droplinked.text')} />
        </Flex>
        <Flex gap={2}>
          <IconButton
            aria-label={t('designerSidebar.common.buttons.refreshCustomizations')}
            icon={<AppIcons.Refresh2 width="16px" height="16px" />}
            backgroundColor="neutral.gray.900"
            color="white"
            _hover={{ backgroundColor: '#222' }}
          />
          <IconButton
            aria-label={t('designerSidebar.common.buttons.toggleSidebar')}
            icon={<AppIcons.SideBarCollapse width="20px" height="20px" />}
            onClick={toggleSidebar}
            _hover={{ backgroundColor: '#222' }}
            backgroundColor="neutral.gray.900"
            color="white"
          />
        </Flex>
      </Flex>
      <AppSelect
        items={[t('designerSidebar.common.pageSelector')]}
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
  const { t } = useLocaleResources('storefront', { en: localEn, ar: localAr });

  return (
    <Flex direction="column" alignItems="center" gap="24px" mb="24px">
      <AppIcons.SidebarDroplinked width="32px" height="32px" aria-label={t('designerSidebar.common.droplinked.logo')} />
      <IconButton
        aria-label={t('designerSidebar.common.buttons.toggleSidebar')}
        icon={<AppIcons.SideBarExpand width="20px" height="20px" />}
        onClick={toggleSidebar}
        backgroundColor="neutral.gray.900"
        color="white"
        _hover={{ backgroundColor: '#222' }}
      />
    </Flex>
  );
}
