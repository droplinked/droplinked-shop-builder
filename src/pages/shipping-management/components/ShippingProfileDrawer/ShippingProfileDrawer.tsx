import React from 'react'
import ShippingProfileDrawerLayout from './ShippingProfileDrawerLayout'
import ShippingProfileForm from './ShippingProfileForm'

interface Props {
    isOpen: boolean
    onClose: () => void
    shippingProfile?: any
}

const ShippingProfileDrawer = ({ isOpen, onClose, shippingProfile }: Props) => {
    return (
        <ShippingProfileDrawerLayout isOpen={isOpen} onDrawerClose={onClose}>
            <ShippingProfileForm onDrawerClose={onClose} shippingProfile={shippingProfile} />
        </ShippingProfileDrawerLayout>
    )
}

export default ShippingProfileDrawer
