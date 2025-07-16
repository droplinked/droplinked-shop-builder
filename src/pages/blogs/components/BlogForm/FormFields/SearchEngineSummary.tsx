import Textarea from 'components/redesign/textarea/Textarea'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'

function SearchEngineSummary() {
    const { values, setFieldValue } = useBlogForm()
    const { t } = useLocaleResources("blogs")

    return (
        <Textarea
            label={t("SearchEngineSummary.label")}
            description={t("SearchEngineSummary.description")}
            placeholder={t("SearchEngineSummary.placeholder")}
            value={values.searchEngineSummary}
            onChange={(e) => setFieldValue("searchEngineSummary", e.target.value)}
        />
    )
}

export default SearchEngineSummary