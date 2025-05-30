import SectionContainer from 'pages/settings/components/common/SectionContainer'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import Balance from './Balance'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function Credits() {
    const { t } = useLocaleResources('settings')

    return (
        <SectionContainer title={t('settings.credits.title')}>
            <SectionContent
                title={t('settings.credits.remainingBalance')}
                description={t('settings.credits.description')}
                rightContent={<Balance />}
            />
        </SectionContainer>
    )
}
