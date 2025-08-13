import {
  Flex,
  FormErrorMessage,
  Text,
  Textarea
} from '@chakra-ui/react';
import { AsteriskSm } from 'assets/icons/Sign/Asterisk/AsteriskSm';
import AppSelect from 'components/redesign/select/AppSelect';
import { Form, Formik } from 'formik';
import React, { useRef } from 'react';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
  primaryGoal: Yup.string().required('Primary goal is required'),
  organizationSize: Yup.string().required('Organization size is required'),
});

export function EnterpriseContent({
  isDrawer = false,
  onDataChange,
  onValidationChange
}: {
  isDrawer?: boolean;
  onDataChange?: (data: {
    primaryGoal: string;
    organizationSize: string;
    featureDescription: string;
  }) => void;
  onValidationChange?: (isValid: boolean) => void;
}) {
  const previousValuesRef = useRef({
    primaryGoal: '',
    organizationSize: '',
    featureDescription: ''
  });
  const previousIsValidRef = useRef(false);

  // Notify parent component when data changes
  const handleFormChange = (values: {
    primaryGoal: string;
    organizationSize: string;
    featureDescription: string;
  }) => {
    // Only notify if values actually changed
    if (JSON.stringify(values) !== JSON.stringify(previousValuesRef.current)) {
      previousValuesRef.current = values;
      if (onDataChange) {
        onDataChange(values);
      }
    }
  };

  // Check validation and notify parent
  const handleValidationChange = (isValid: boolean) => {
    // Only notify if validation state changed
    if (isValid !== previousIsValidRef.current) {
      previousIsValidRef.current = isValid;
      onValidationChange?.(isValid);
    }
  };

  return (
    <Formik
      initialValues={{
        primaryGoal: '',
        organizationSize: '',
        featureDescription: ''
      }}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={() => {}} // Form submission is handled by parent component
    >
      {({ values, errors, touched, handleChange, handleBlur, isValid }) => {
        // Notify parent of changes using refs to avoid infinite loops
        handleFormChange(values);
        handleValidationChange(isValid);

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
              <Flex direction="column" gap={4} w="100%">
                <Flex align="center" gap={1}>
                  <Text
                    display="flex"
                    alignItems="center"
                    gap={1}
                    color="white"
                    fontSize="base"
                    fontWeight="medium"
                  >
                    What's your primary goal? <AsteriskSm color="#FF2244" />
                  </Text>
                </Flex>

                <AppSelect
                  items={[
                    'Leverage Blockchain Technology',
                    'Enhance Security',
                    'Digital Asset Payment Enablement',
                    'Affiliate Inventory Automation',
                    'Other'
                  ]}
                  selectProps={{
                    placeholder: 'Select Category',
                    name: 'primaryGoal',
                    value: values.primaryGoal,
                    onChange: handleChange,
                    onBlur: handleBlur
                  }}
                />
                <FormErrorMessage color="red.400" fontSize="sm">
                  {errors.primaryGoal}
                </FormErrorMessage>

                <Textarea
                  bg="transparent"
                  borderColor="neutral.gray.800"
                  borderRadius="8px"
                  placeholder="Briefly describe your primary goal"
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
              </Flex>

              <Flex direction="column" w="100%">
                <Flex align="center" gap={1}>
                  <Text
                    display="flex"
                    alignItems="center"
                    gap={1}
                    color="white"
                    fontSize="base"
                    fontWeight="medium"
                  >
                    How large is the organization?{' '}
                    <AsteriskSm color="#FF2244" />
                  </Text>
                </Flex>

                <AppSelect
                  items={[
                    '1-10 Employees',
                    '11-50 Employees',
                    '51-200 Employees',
                    '200+ Employees'
                  ]}
                  selectProps={{
                    placeholder: 'Team Size',
                    name: 'organizationSize',
                    value: values.organizationSize,
                    onChange: handleChange,
                    onBlur: handleBlur
                  }}
                />
                <FormErrorMessage color="red.400" fontSize="sm">
                  {errors.organizationSize}
                </FormErrorMessage>
              </Flex>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
}
