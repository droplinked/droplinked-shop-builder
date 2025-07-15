import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import BaseEmptyState from './BaseEmptyState'

function OrderSummaryEmptyState() {
    const { t } = useLocaleResources("dashboardPage")

    return (
        <BaseEmptyState
            image='https://upload-file-droplinked.s3.amazonaws.com/88ed459467914a77c84c54b9b845eb0b71e8113fdc359d55855b71a8c5675902.png'
            title={t('OrderSummaryEmptyState.title')}
            description={t('OrderSummaryEmptyState.description')}
            actionText={t('OrderSummaryEmptyState.actionText')}
            onActionClick={() => window.open('https://droplinked.gitbook.io/droplinked-store-front-help-center/how-to-guides/manage-orders', '_blank')}
        />
    )
}

export default OrderSummaryEmptyState