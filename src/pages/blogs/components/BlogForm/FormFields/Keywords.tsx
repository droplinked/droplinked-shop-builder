import KeywordInput from 'components/redesign/keyword-input/KeywordInput'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'

function Keywords() {
    const { values, setFieldValue } = useBlogForm()
    const { t } = useLocaleResources("blogs")

    return (
        <KeywordInput
            keywords={values.tags}
            onKeywordsChange={(keywords) => setFieldValue('tags', keywords)}
            label={t("form.keywords.label")}
            description={t("form.keywords.description")}
            placeholder={t("form.keywords.placeholder")}
        />
    )
}

export default Keywords