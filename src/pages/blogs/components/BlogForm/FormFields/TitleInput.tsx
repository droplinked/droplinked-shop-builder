import AppInput from 'components/redesign/input/AppInput'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'

function TitleInput() {
    const { values, errors, setFieldValue } = useBlogForm()
    const { t } = useLocaleResources("blogs")

    return (
        <AppInput
            label={t("TitleInput.label")}
            description={t("TitleInput.description")}
            inputProps={{
                isRequired: true,
                placeholder: t("TitleInput.placeholder"),
                value: values.title,
                onChange: (e) => setFieldValue('title', e.target.value),
                "aria-label": t("TitleInput.label"),
            }}
            {...errors.title && { state: "error", message: errors.title }}
        />
    )
}

export default TitleInput