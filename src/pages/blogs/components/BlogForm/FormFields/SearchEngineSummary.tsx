import Textarea from 'components/redesign/textarea/Textarea'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'

function SearchEngineSummary() {
    const { values, setFieldValue } = useBlogForm()
    const { t } = useLocaleResources("blogs")

    return (
        <Textarea
            label={t("form.searchEngineSummary.label")}
            description={t("form.searchEngineSummary.description")}
            placeholder={t("form.searchEngineSummary.placeholder")}
            value={values.searchEngineSummary}
            onChange={(e) => setFieldValue("searchEngineSummary", e.target.value)}
        />
    )
}

export default SearchEngineSummary