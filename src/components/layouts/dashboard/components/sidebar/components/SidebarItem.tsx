import { Box, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, useBreakpointValue } from '@chakra-ui/react';
import AppTooltip from 'components/common/tooltip/AppTooltip';
import AppTypography from 'components/common/typography/AppTypography';
import { AppAccordionChevron, AppAccordionItem, AppAccordionTrigger } from 'components/redesign/accordion/AppAccordion';
import useAppStore from 'lib/stores/app/appStore';
import React, { useEffect, useRef, useState } from 'react';

import SidebarSubmenu from './SidebarSubmenu';
import SidebarSubmenuTooltip from './SidebarSubmenuTooltip';
import DashboardLinkWrapper from '../../common/DashboardLinkWrapper';

const SidebarItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const isMdOrSmaller = useBreakpointValue({ base: false, md: true, lg: false });
  const { shop } = useAppStore();
  const hasChild = item.list.length !== 0;

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (item.title === 'Quests' && shop.hasCompletedQuests) return null;

  return (
    <AppAccordionItem width="100%" itemId={item.title} isCollapsable={!!item.list?.length}>
      <AppAccordionTrigger width="100%">
        <DashboardLinkWrapper linkTo={item.linkTo} onClick={item.onClick}>
          <Flex width="100%" padding={{ base: '10px', lg: '12px' }} alignItems="center" gap="8px" _hover={{ backgroundColor: '#222' }} rounded="8px">
            {/* Sidebar Icon with Tooltip on Tablet */}
            <Box width="20px" height="20px">
              {isMdOrSmaller && hasChild ? (
                <Popover placement="right" isOpen={isOpen} onClose={() => setIsOpen(false)}>
                  <div ref={popoverRef}>
                    <PopoverTrigger>
                      <span onClick={() => setIsOpen(!isOpen)}>
                        <AppTooltip flexShrink={0} placement="left-start" label={item.title} border="none" backgroundColor="#1C1C1C" ml={4} color="white">
                          <item.icon color="#FFF" />
                        </AppTooltip>
                      </span>
                    </PopoverTrigger>
                    <PopoverContent w="300px" h="168px" paddingTop="30px  " border="none" boxShadow="none" bg="transparent" zIndex={9999999}>
                      <PopoverBody>
                        <SidebarSubmenuTooltip title={item.title} items={item.list} />
                      </PopoverBody>
                    </PopoverContent>
                  </div>
                </Popover>
              ) : (
                <item.icon color="#FFF" />
              )}
            </Box>

            {/* Sidebar Title & Chevron */}
            <Flex display={{ sm: 'flex', md: 'none', lg: 'flex' }} justifyContent="space-between" w="100%">
              <AppTypography
                cursor="pointer"
                color="#FFF"
                fontFamily="Inter"
                fontSize="14px"
                _groupHover={{ letterSpacing: '0.2px', fontWeight: '500' }}
                style={{ transition: 'letter-spacing .1s linear' }}
                fontWeight="400"
                lineHeight="20px"
                flex="1"
                whiteSpace={'nowrap'}
              >
                {item.title}
              </AppTypography>
              {item.list?.length > 0 && <AppAccordionChevron width="20px" height="20px" />}
            </Flex>
          </Flex>
        </DashboardLinkWrapper>
      </AppAccordionTrigger>

      {/* Submenu (if available) */}
      {item.list?.length > 0 && <SidebarSubmenu list={item.list} />}
    </AppAccordionItem>
  );
};

export default SidebarItem;
