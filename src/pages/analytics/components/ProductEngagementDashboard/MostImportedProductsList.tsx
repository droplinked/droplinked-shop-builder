import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import EmptyState from './EmptyState'

function MostImportedProductsList() {
    const { t } = useLocaleResources("analyticsPage")

    return (
        <EmptyState
            image='https://upload-file-droplinked.s3.amazonaws.com/1fe7643467d9377029d79c30e6c055bdea622cde3e746af5315b9b89a3c979b4.png'
            title={t('common:growWithDroplinked')}
            description={t('growWithDroplinkedDesc')}
        />
    )
}

export default MostImportedProductsList
