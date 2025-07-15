import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BaseEmptyState from './BaseEmptyState'

function AffiliateProgramEmptyState() {
    const navigate = useNavigate()
    const { t } = useLocaleResources("dashboardPage")

    return (
        <BaseEmptyState
            image='https://upload-file-droplinked.s3.amazonaws.com/3836e4d6a9aa52de8b4336274e6f87230936ee9bc9624d2e210daa4b5ca8cab8.png'
            title={t('growWithDroplinked')}
            description={t('AffiliateProgramEmptyState.description')}
            actionText={t('AffiliateProgramEmptyState.actionText')}
            onActionClick={() => navigate("/analytics/affiliate/products")}
        />
    )
}

export default AffiliateProgramEmptyState