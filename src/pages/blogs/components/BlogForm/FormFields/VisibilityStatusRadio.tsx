import { Flex, useRadioGroup } from '@chakra-ui/react'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import CustomRadioCard from 'pages/products/components/ProductDrawer/components/common/CustomRadioCard'
import React from 'react'

function VisibilityStatusRadio() {
    const { values, setFieldValue } = useBlogForm()
    const { t } = useLocaleResources("blogs")

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-visibility-status',
        onChange: (value: string) => setFieldValue('isVisible', value === 'visible'),
        value: values.isVisible ? 'visible' : 'draft'
    })

    const statusList = [
        { label: t("form.visibilityStatus.options.draft"), value: 'draft' },
        { label: t("form.visibilityStatus.options.visible"), value: 'visible' }
    ]

    return (
        <FormFieldWrapper
            label={t("form.visibilityStatus.label")}
            description={t("form.visibilityStatus.description")}
            isRequired
        >
            <Flex
                direction={{ base: 'column', md: 'row', lg: 'column', xl: 'row' }}
                gap={4}
                {...getRootProps()}
            >
                {statusList.map(({ label, value }) =>
                    <CustomRadioCard key={label} label={label} {...getRadioProps({ value })} />
                )}
            </Flex>
        </FormFieldWrapper>
    )
}

export default VisibilityStatusRadio