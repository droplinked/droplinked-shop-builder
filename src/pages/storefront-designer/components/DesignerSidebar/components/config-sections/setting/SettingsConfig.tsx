import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import SwitchBox from 'components/redesign/switch-box/SwitchBox';
import React, { useState, useEffect, useContext } from 'react';
import SectionItem from '../../common/SectionItem';
import { getNextDayMidnightISO } from 'utils/helpers/dateUtils';
import AppDatepicker from 'components/common/datepicker/AppDatepicker';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import useLocaleResources from '../../../../../../../hooks/useLocaleResources/useLocaleResources';
import localEn from '../../../../../../../locales/storefront/en.json';
import localAr from '../../../../../../../locales/storefront/ar.json';

/**
 * Settings configuration for release date and other settings
 */
function SettingsConfig(): React.ReactElement {
  const { state, methods } = useContext(designerContext);
  const launchDate = state?.shop?.launchDate;
  const { t } = useLocaleResources('storefront', { en: localEn, ar: localAr });

  const [isEnabled, setIsEnabled] = useState(() => Boolean(launchDate));
  const [formattedDate, setFormattedDate] = useState('5 Aug, 2024 - 22:13');

  // Format date when launch date changes
  useEffect(() => {
    if (launchDate) {
      const date = new Date(launchDate);
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      setFormattedDate(date.toLocaleDateString('en-US', options).replace(',', ' -'));
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [launchDate]);

  /**
   * Handle toggle for enabling/disabling release date
   */
  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    if (newState) {
      methods?.dispatch({ type: 'updateShop', params: { launchDate: getNextDayMidnightISO() } });
    } else {
      methods?.dispatch({ type: 'updateShop', params: { launchDate: null } });
    }
  };

  /**
   * Handle date change from date picker
   */
  const handleDateChange = (date: Date) => {
    methods?.dispatch({
      type: 'updateShop',
      params: { launchDate: date.toISOString() }
    });
  };

  return (
    <VStack width="100%" height="auto" display="flex" align="stretch">
      <SectionItem>
        <Flex width="100%" height="auto" display="flex" alignItems="flex-start" gap={4} borderRadius="40px">
          <SwitchBox isChecked={isEnabled} onToggle={handleToggle} />

          <VStack width="auto" height="auto" display="flex" flex="1" alignItems="flex-start" spacing={4} overflow="hidden">
            <Box width="100%" height="auto">
              <Text fontSize="base" fontWeight="medium" color="white">
                {t('designerSidebar.settingsConfig.releaseDate.title')}
              </Text>
              <Text fontSize="sm" color="neutral.gray.500">
                {t('designerSidebar.settingsConfig.releaseDate.description')}
              </Text>
            </Box>

            {isEnabled && (
              <Box width="100%" height="auto">
                <AppDatepicker
                  onChange={handleDateChange}
                  minDate={new Date()}
                  value={launchDate ? new Date(launchDate) : null}
                  showTimeInput
                  placeholderText={formattedDate}
                  dateFormat="d MMM, yyyy - HH:mm"
                />
              </Box>
            )}
          </VStack>
        </Flex>
      </SectionItem>
    </VStack>
  );
}

export default SettingsConfig;
