import React from 'react'
import EmptyState from './EmptyState'

function OrderSummaryEmptyState() {
    return (
        <EmptyState
            image='https://upload-file-droplinked.s3.amazonaws.com/88ed459467914a77c84c54b9b845eb0b71e8113fdc359d55855b71a8c5675902.png'
            title='No Orders Yet'
            description='Learn how to promote and grow across the network'
            linkText='Learn More'
            linkTo='https://www.google.com/'
        />
    )
}

export default OrderSummaryEmptyState