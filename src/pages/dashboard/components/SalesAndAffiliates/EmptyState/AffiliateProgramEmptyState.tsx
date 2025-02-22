import React from 'react'
import { useNavigate } from 'react-router-dom'
import BaseEmptyState from './BaseEmptyState'

function AffiliateProgramEmptyState() {
    const navigate = useNavigate()

    return (
        <BaseEmptyState
            image='https://upload-file-droplinked.s3.amazonaws.com/3836e4d6a9aa52de8b4336274e6f87230936ee9bc9624d2e210daa4b5ca8cab8.png'
            title='Grow with droplinked!'
            description='Invite customers and activate partners to accelerate sales'
            actionText='Affiliate Market'
            onActionClick={() => navigate("/analytics/affiliate/products")}
        />
    )
}

export default AffiliateProgramEmptyState