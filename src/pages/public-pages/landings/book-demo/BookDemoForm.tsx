import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import AppInput from 'components/redesign/input/AppInput'
import AppSelect from 'components/redesign/select/AppSelect'
import Textarea from 'components/redesign/textarea/Textarea'
import { Form, Formik } from 'formik'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import * as Yup from 'yup'

interface FormValues {
    name: string
    email: string
    phoneNumber: string
    organizationSize: string
    additionalDetails: string
}

export default function BookDemoForm() {
    const { t } = useLocaleResources('book-demo')

    const organizationSizeOptions = [
        { value: '1-10 Employees', caption: t('BookDemoForm.organizationSizeOptions._1_10') },
        { value: '11-50 Employees', caption: t('BookDemoForm.organizationSizeOptions._11_50') },
        { value: '51-200 Employees', caption: t('BookDemoForm.organizationSizeOptions._51_200') },
        { value: '200+ Employees', caption: t('BookDemoForm.organizationSizeOptions._200_plus') }
    ]

    const formSchema = Yup.object().shape({
        name: Yup.string().required(t('common:required')),
        email: Yup.string().email(t('BookDemoForm.invalidEmail')).required(t('common:required')),
        phoneNumber: Yup.string(),
        organizationSize: Yup.string(),
        additionalDetails: Yup.string()
    })

    const handleSubmit = (data: FormValues, actions) => {
        actions.resetForm()
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                phoneNumber: '',
                organizationSize: '',
                additionalDetails: ''
            }}
            validationSchema={formSchema}
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, errors, isSubmitting }) => (
                <Form
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: "24px"
                    }}
                >
                    <Flex direction="column" gap={6}>
                        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                            <AppInput
                                label={t('BookDemoForm.name')}
                                inputProps={{
                                    id: "name",
                                    name: "name",
                                    isRequired: true,
                                    value: values.name,
                                    onChange: handleChange
                                }}
                                message={errors.name}

                            />
                            <AppInput
                                label={t('BookDemoForm.email')}
                                inputProps={{
                                    id: "email",
                                    name: "email",
                                    isRequired: true,
                                    value: values.email,
                                    onChange: handleChange
                                }}
                                message={errors.email}
                            />
                        </Flex>

                        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                            <AppInput
                                label={t('BookDemoForm.phoneNumber')}
                                inputProps={{
                                    id: "phoneNumber",
                                    name: "phoneNumber",
                                    value: values.phoneNumber,
                                    onChange: handleChange
                                }}
                            />
                            <AppSelect
                                label={t('BookDemoForm.organizationSize')}
                                inputGroupProps={{
                                    sx: { "label": { fontSize: 16 } }
                                }}
                                selectProps={{
                                    id: "organizationSize",
                                    name: "organizationSize",
                                    placeholder: t('BookDemoForm.organizationSizePlaceholder'),
                                    value: values.organizationSize,
                                    onChange: handleChange
                                }}
                                items={organizationSizeOptions}
                                labelAccessor="caption"
                                valueAccessor="value"
                            />
                        </Flex>

                        <Textarea
                            id="additionalDetails"
                            name="additionalDetails"
                            label={t('BookDemoForm.additionalDetails')}
                            placeholder={t('BookDemoForm.additionalDetailsPlaceholder')}
                            value={values.additionalDetails}
                            onChange={handleChange}
                        />
                    </Flex>

                    <AppButton type="submit" isLoading={isSubmitting}>
                        {t('common:submit')}
                    </AppButton>
                </Form>
            )}
        </Formik>
    )
}