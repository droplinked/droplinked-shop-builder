import AppInput from 'components/redesign/input/AppInput'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'

function TitleInput() {
    const { values, errors, setFieldValue } = useBlogForm()
    const { t } = useLocaleResources("blogs")

    return (
        <AppInput
            label={t("form.title.label")}
            description={t("form.title.description")}
            inputProps={{
                isRequired: true,
                placeholder: t("form.title.placeholder"),
                value: values.title,
                onChange: (e) => setFieldValue('title', e.target.value),
                "aria-label": t("form.title.label"),
            }}
            {...errors.title && { state: "error", message: errors.title }}
        />
    )
}

export default TitleInput