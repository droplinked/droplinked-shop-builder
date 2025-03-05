import { Flex } from '@chakra-ui/react'
import { Formik } from 'formik'
import React from 'react'
import StepWrapper from '../StepWrapper'
import { initialValues, SetupFormValues, validationSchema } from './formConfig'
import LogoUploader from './LogoUploader'
import CoverImage from './CoverImage'
import UrlChooser from './UrlChooser'
import NameField from './NameField'
import DescriptionField from './DescriptionField'

function ShopSetupForm() {
    return (
        <StepWrapper
            heading='Store details'
            description='Complete the information below to optimize your storefront.'
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnMount={false}
                validateOnChange={false}
                onSubmit={(values: SetupFormValues) => {
                    console.log(values)
                }}
            >
                <Flex gap={9} direction="column">
                    <LogoUploader />
                    <CoverImage />
                    <UrlChooser />
                    <NameField />
                    <DescriptionField />
                </Flex>
            </Formik>
        </StepWrapper>
    )
}

export default ShopSetupForm