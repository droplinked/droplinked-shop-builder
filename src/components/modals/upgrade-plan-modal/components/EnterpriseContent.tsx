import { Flex, Textarea } from '@chakra-ui/react';
import AppSelect from 'components/redesign/select/AppSelect';
import { Form, Formik } from 'formik';
import React, { useRef } from 'react';
import * as Yup from 'yup';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { EnterpriseFormData } from '../types/upgradePlan.types';
import { FormField } from './FormField';

const createValidationSchema = (t: (key: string) => string) => Yup.object({
  primaryGoal: Yup.string().required(t('UpgradePlanModal.EnterpriseContent.primaryGoalRequired')),
  organizationSize: Yup.string().required(t('UpgradePlanModal.EnterpriseContent.organizationSizeRequired')),
  featureDescription: Yup.string().required(t('UpgradePlanModal.EnterpriseContent.featureDescriptionRequired'))
});

interface EnterpriseContentProps {
  isDrawer?: boolean;
  onDataChange?: (data: EnterpriseFormData) => void;
}

export function EnterpriseContent({ isDrawer = false, onDataChange }: EnterpriseContentProps) {
  const { t } = useLocaleResources('common');
  const previousValuesRef = useRef<EnterpriseFormData>({
    primaryGoal: '',
    organizationSize: '',
    featureDescription: ''
  });

  const handleFormChange = (values: EnterpriseFormData) => {
    if (JSON.stringify(values) !== JSON.stringify(previousValuesRef.current)) {
      previousValuesRef.current = values;
      onDataChange?.(values);
    }
  };

  const primaryGoalOptions = [
    t('UpgradePlanModal.EnterpriseContent.primaryGoalOptions.blockchainTechnology'),
    t('UpgradePlanModal.EnterpriseContent.primaryGoalOptions.enhanceSecurity'),
    t('UpgradePlanModal.EnterpriseContent.primaryGoalOptions.digitalAssetPayment'),
    t('UpgradePlanModal.EnterpriseContent.primaryGoalOptions.affiliateInventory'),
    t('UpgradePlanModal.EnterpriseContent.primaryGoalOptions.other')
  ];

  const organizationSizeOptions = [
    t('UpgradePlanModal.EnterpriseContent.organizationSizeOptions.small'),
    t('UpgradePlanModal.EnterpriseContent.organizationSizeOptions.medium'),
    t('UpgradePlanModal.EnterpriseContent.organizationSizeOptions.large'),
    t('UpgradePlanModal.EnterpriseContent.organizationSizeOptions.enterprise')
  ];

  return (
    <Formik
      initialValues={{
        primaryGoal: '',
        organizationSize: '',
        featureDescription: ''
      }}
      validationSchema={createValidationSchema(t)}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => {
        handleFormChange(values);

        return (
          <Form>
            <Flex
              minHeight={isDrawer ? 'auto' : '432px'}
              direction="column"
              p={12}
              gap={9}
              w="100%"
              overflow="hidden"
            >
              <FormField label={t('UpgradePlanModal.EnterpriseContent.primaryGoalLabel')} error={errors.primaryGoal}>
                <AppSelect
                  items={primaryGoalOptions}
                  selectProps={{
                    placeholder: t('UpgradePlanModal.EnterpriseContent.selectCategoryPlaceholder'),
                    name: 'primaryGoal',
                    value: values.primaryGoal,
                    onChange: handleChange,
                    onBlur: handleBlur
                  }}
                />
                <Textarea
                  bg="transparent"
                  borderColor="neutral.gray.800"
                  borderRadius="8px"
                  placeholder={t('UpgradePlanModal.EnterpriseContent.descriptionPlaceholder')}
                  name="featureDescription"
                  color="white"
                  value={values.featureDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  _placeholder={{ color: 'text.subtext.placeholder.dark' }}
                  _focus={{
                    borderColor: 'blue.400'
                  }}
                />
              </FormField>

              <FormField label={t('UpgradePlanModal.EnterpriseContent.organizationSizeLabel')} error={errors.organizationSize}>
                <AppSelect
                  items={organizationSizeOptions}
                  selectProps={{
                    placeholder: t('UpgradePlanModal.EnterpriseContent.teamSizePlaceholder'),
                    name: 'organizationSize',
                    value: values.organizationSize,
                    onChange: handleChange,
                    onBlur: handleBlur
                  }}
                />
              </FormField>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
}
