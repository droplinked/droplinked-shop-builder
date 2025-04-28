import { Flex, useRadioGroup } from '@chakra-ui/react'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import CustomRadioCard from 'pages/products/components/ProductDrawer/components/common/CustomRadioCard'
import React from 'react'

function VisibilityStatusRadio() {
    const { values, setFieldValue } = useBlogForm()

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-visibility-status',
        onChange: (value: string) => setFieldValue('isVisible', value === 'visible'),
        value: values.isVisible ? 'visible' : 'draft'
    })

    const statusList = [
        { label: 'Draft', value: 'draft' },
        { label: 'Visible', value: 'visible' }
    ]

    return (
        <FormFieldWrapper
            label="Visibility Status"
            description="Save as a draft or publish the post when ready."
            isRequired
        >
            <Flex direction="row" gap={4} {...getRootProps()}>
                {statusList.map(({ label, value }) =>
                    <CustomRadioCard key={label} label={label} {...getRadioProps({ value })} />
                )}
            </Flex>
        </FormFieldWrapper>
    )
}

export default VisibilityStatusRadio