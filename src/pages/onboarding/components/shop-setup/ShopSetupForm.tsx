import { Flex } from '@chakra-ui/react'
import { Formik, FormikHelpers } from 'formik'
import useStoreCreation from 'pages/onboarding/store/useStoreCreation'
import React from 'react'
import StepWrapper from '../StepWrapper'
import ControlButtons from './ControlButtons'
import CoverImage from './CoverImage'
import DescriptionField from './DescriptionField'
import { getInitialValues, SetupFormValues, validationSchema } from './formConfig'
import LogoUploader from './LogoUploader'
import NameField from './NameField'
import UrlChooser from './UrlChooser'

function ShopSetupForm({ onBack, onNext }) {
    const { storeData, clearStoreData } = useStoreCreation()
    const handleSubmit = (values: SetupFormValues, { setSubmitting }: FormikHelpers<SetupFormValues>) => {
        console.log("Form submitted with values:", values)
        onNext()
    }
    const handleBack = () => {
        clearStoreData()
        onBack()
    }

    return (
        <StepWrapper
            heading='Store details'
            description='Complete the information below to optimize your storefront.'
        >
            <Formik
                initialValues={getInitialValues(storeData)}
                validationSchema={validationSchema}
                validateOnMount={false}
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
                <Flex gap={9} direction="column">
                    <LogoUploader />
                    <CoverImage />
                    <UrlChooser />
                    <NameField />
                    <DescriptionField />
                    <ControlButtons onBack={handleBack} />
                </Flex>
            </Formik>
        </StepWrapper>
    )
}

export default ShopSetupForm