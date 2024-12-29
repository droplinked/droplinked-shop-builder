import useAppStore from 'lib/stores/app/appStore'
import SectionContent from 'pages/settings/components/SectionContent'
import React from 'react'

export default function Address() {
    const { shop } = useAppStore()

    return (
        <SectionContent
            title="Address"
            description='Provide the store or warehouse address for delivery and tax calculations.'
        // rightContent={
        //     <Input inputProps={{ placeholder: "Email Address", value: email }} />
        // }
        />
    )
}
