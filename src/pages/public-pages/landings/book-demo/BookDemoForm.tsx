import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import AppInput from 'components/redesign/input/AppInput'
import AppSelect from 'components/redesign/select/AppSelect'
import Textarea from 'components/redesign/textarea/Textarea'
import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

interface FormValues {
    name: string
    email: string
    phoneNumber: string
    organizationSize: string
    additionalDetails: string
}

const organizationSizeOptions = [
    { value: '1-10 Employees', caption: '1-10 Employees' },
    { value: '11-50 Employees', caption: '11-50 Employees' },
    { value: '51-200 Employees', caption: '51-200 Employees' },
    { value: '200+ Employees', caption: '200+ Employees' }
]

export default function BookDemoForm() {
    const formSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
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
                                label='Name'
                                inputProps={{
                                    id: "name",
                                    name: "name",
                                    isRequired: true,
                                    value: values.name,
                                    onChange: handleChange
                                }}
                                message={errors.name ?? undefined}
                            />
                            <AppInput
                                label='Email'
                                inputProps={{
                                    id: "email",
                                    name: "email",
                                    isRequired: true,
                                    value: values.email,
                                    onChange: handleChange
                                }}
                            />
                        </Flex>

                        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                            <AppInput
                                label='Phone Number'
                                inputProps={{
                                    id: "phoneNumber",
                                    name: "phoneNumber",
                                    value: values.phoneNumber,
                                    onChange: handleChange
                                }}
                            />
                            <AppSelect
                                label='Organization Size'
                                inputGroupProps={{
                                    sx: { "label": { fontSize: 16 } }
                                }}
                                selectProps={{
                                    id: "organizationSize",
                                    name: "organizationSize",
                                    placeholder: "Organization Size",
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
                            label='Additional Details'
                            placeholder="Please enter any additional information"
                            value={values.additionalDetails}
                            onChange={handleChange}
                        />
                    </Flex>

                    <AppButton type="submit" isLoading={isSubmitting}>
                        Submit
                    </AppButton>
                </Form>
            )}
        </Formik>
    )
}