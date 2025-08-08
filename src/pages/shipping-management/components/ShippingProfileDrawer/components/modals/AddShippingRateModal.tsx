import { Flex } from '@chakra-ui/react'
import AppInput from 'components/redesign/input/AppInput'
import React, { useState } from 'react'
import ShippingDrawer from '../../../common/ShippingDrawer'

interface Props {
    isOpen: boolean
    onClose: () => void
    onSave: (rateName: string) => void
}

function AddShippingRateModal({ isOpen, onClose, onSave }: Props) {
    const [rateName, setRateName] = useState('')

    const handleSave = () => {
        if (!rateName.trim()) return
        onSave(rateName.trim())
        onClose()
        setRateName('')
    }

    return (
        <ShippingDrawer isOpen={isOpen} onClose={onClose}>
            <ShippingDrawer.Header title="Add Shipping Rate" description="Create Shopping Profile" />
            <ShippingDrawer.Body>
                <Flex flexDirection="column" gap={6} padding={9}>
                    <AppInput
                        label="Rate Name"
                        inputProps={{
                            placeholder: 'Enter rate name',
                            value: rateName,
                            onChange: (e) => setRateName(e.target.value),
                            isRequired: true,
                        }}
                    />
                </Flex>
            </ShippingDrawer.Body>
            <ShippingDrawer.Footer
                primaryText="Save"
                secondaryText="Discard"
                onPrimary={handleSave}
                onSecondary={onClose}
                primaryButtonProps={{ isDisabled: !rateName.trim() }}
            />
        </ShippingDrawer>
    )
}

export default AddShippingRateModal

