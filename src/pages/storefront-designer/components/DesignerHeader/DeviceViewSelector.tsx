import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import { DesktoppcMd } from 'assets/icons/StyleDesigner/DesktopPC/DesktoppcMd';
import { TabletMd } from 'assets/icons/StyleDesigner/Tablet/TabletMd';
import { MobileMd } from 'assets/icons/StyleDesigner/Mobile/MobileMd';

/**
 * Device type for preview modes
 */
type DeviceType = 'desktop' | 'tablet' | 'mobile';

/**
 * Available device options for preview
 */
const deviceOptions = [
  {
    id: 'desktop' as DeviceType,
    label: 'Desktop',
    icon: (color: string) => <DesktoppcMd color={color} />
  },
  {
    id: 'tablet' as DeviceType,
    label: 'Tablet',
    icon: (color: string) => <TabletMd color={color} />
  },
  {
    id: 'mobile' as DeviceType,
    label: 'Mobile',
    icon: (color: string) => <MobileMd color={color} />
  }
];

/**
 * Device view selector component for switching between display modes
 */
function DeviceViewSelector(): React.ReactElement {
  const { state: { device }, methods: { dispatch }} = useContext(designerContext);

  const isSmallerThanLg = useBreakpointValue({ base: true, lg: false });

  const handleDeviceChange = (selectedDevice: DeviceType): void => {
    dispatch({ type: 'updateState', params: { device: selectedDevice } });
  };

  // Handle responsive device view switching
  useEffect(() => {
    if (isSmallerThanLg && device === 'desktop') {
      handleDeviceChange('tablet');
    } else if (!isSmallerThanLg && device === 'tablet' && window.innerWidth >= 992) {
      handleDeviceChange('desktop');
    }
  }, [isSmallerThanLg]);

  // Filter available options based on screen size
  const visibleOptions = isSmallerThanLg ? deviceOptions.filter((option) => option.id !== 'desktop') : deviceOptions;

  return (
    <Flex justifyContent="center">
      <Box width="auto" display="inline-flex" padding={1} gap={1} bg="neutral.gray.1000" borderRadius="lg">
        {visibleOptions.map((option) => {
          const isActive = device === option.id;
          return (
            <Box
              key={option.id}
              width="28"
              height="auto"
              display="flex"
              position="relative"
              justifyContent="center"
              alignItems="center"
              gap={1.5}
              padding="8px 12px"
              cursor="pointer"
              bg={isActive ? 'neutral.gray.800' : 'transparent'}
              borderRadius="md"
              onClick={() => handleDeviceChange(option.id)}
            >
              {option.icon(isActive ? 'white' : '#7B7B7B')}
              <Box fontSize="xs" fontWeight={isActive ? 'medium' : 'normal'} color={isActive ? 'white' : 'text.subtext.placeholder.dark'}>
                {option.label}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Flex>
  );
}

export default DeviceViewSelector;
