import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import AppInput from 'components/redesign/input/AppInput'
import AppSelect from 'components/redesign/select/AppSelect'
import Textarea from 'components/redesign/textarea/Textarea'
import { Form, Formik, FormikHelpers } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { IDemoRequest } from 'services/user/interfaces'
import { postDemoRequestService } from 'services/user/services'
import * as Yup from 'yup'

export default function BookDemoForm() {
    const { t } = useLocaleResources('book-demo')
    const { showToast } = useAppToast()

    const organizationSizeOptions = [
        { value: '1-10 employees', caption: t('BookDemoForm.organizationSizeOptions._1_10') },
        { value: '11-50 employees', caption: t('BookDemoForm.organizationSizeOptions._11_50') },
        { value: '50-200 employees', caption: t('BookDemoForm.organizationSizeOptions._51_200') },
        { value: '200+ employees', caption: t('BookDemoForm.organizationSizeOptions._200_plus') }
    ]

    const formSchema = Yup.object().shape({
        name: Yup.string().required(t('common:required')).min(2, t('BookDemoForm.nameMinLength')).max(100, t('BookDemoForm.nameMaxLength')),
        email: Yup.string().email(t('BookDemoForm.invalidEmail')).required(t('common:required')),
        phone: Yup.string().matches(/^\+.*/, t('BookDemoForm.invalidPhoneNumber')),
        organizationSize: Yup.string(),
        message: Yup.string()
    })

    const handleSubmit = async (values: IDemoRequest, actions: FormikHelpers<IDemoRequest>) => {
        try {
            await postDemoRequestService(values)
            actions.resetForm()
            showToast({ type: 'success', message: t('BookDemoForm.success') })
        } catch (error) {
            showToast({ type: 'error', message: t('common:genericError') })
        }
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                phone: '',
                organizationSize: '',
                message: ''
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
                                    id: "phone",
                                    name: "phone",
                                    value: values.phone,
                                    onChange: handleChange
                                }}
                                message={errors.phone}
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
                            id="message"
                            name="message"
                            label={t('BookDemoForm.additionalDetails')}
                            placeholder={t('BookDemoForm.additionalDetailsPlaceholder')}
                            value={values.message}
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