import Input from 'components/redesign/input/Input'
import useAppStore from 'lib/stores/app/appStore'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'

export default function EmailAddress() {
    const { user } = useAppStore()
    const { email } = user

    return (
        <SectionContent
            title="Email Address"
            description='Provide an email address to manage the account and receive updates.'
            rightContent={
                <Input inputProps={{ placeholder: "Email Address", value: email }} />
            }
        />
    )
}
