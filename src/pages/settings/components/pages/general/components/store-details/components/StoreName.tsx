import Input from 'components/redesign/input/Input'
import useAppStore from 'lib/stores/app/appStore'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'

export default function StoreName() {
    const { shop } = useAppStore()
    const { name } = shop

    return (
        <SectionContent
            title="Store Name"
            description='Enter the store’s name that will appear on the landing page.'
            rightContent={
                <Input inputProps={{ placeholder: "Store Name", value: name }} />
            }
        />
    )
}
