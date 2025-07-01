import React from 'react'
import ClaimNowButton from './ClaimNowButton'
import FinalCta from '../../_shared/components/FinalCta'

interface ClaimNowProps {
    t: (key: string) => string;
}

export default function ClaimNow({ t }: ClaimNowProps) {

    return (
        <FinalCta
            sectionTitle={t('claimNow.sectionTitle')}
            headingTitle={t('claimNow.headingTitle')}
            headingSubtitle={t('claimNow.headingSubtitle')}
            subTitleElement={<ClaimNowButton t={t} />}
        />
    )
}
