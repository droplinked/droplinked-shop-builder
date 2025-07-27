import SectionContainer from 'pages/settings/components/common/SectionContainer'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import Balance from './Balance'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function Credits() {
    const { t } = useLocaleResources('settings')

    return (
        <SectionContainer title={t('Credits.title')}>
            <SectionContent
                title={t('Credits.remainingBalance')}
                description={t('Credits.description')}
                rightContent={<Balance />}
            />
        </SectionContainer>
    )
}
