import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import SwitchBox from 'pages/products/components/ProductDrawer/components/common/SwitchBox'
import React from 'react'

function BlogToggles() {
    const { values, setFieldValue } = useBlogForm()
    const { t } = useLocaleResources("blogs")

    return (
        <SwitchBox
            title={t("BlogToggles.featured.title")}
            description={t("BlogToggles.featured.description")}
            switchProps={{
                isChecked: values.isFeatured,
                onChange: (e) => setFieldValue('isFeatured', e.target.checked)
            }}
        />
    )
}

export default BlogToggles