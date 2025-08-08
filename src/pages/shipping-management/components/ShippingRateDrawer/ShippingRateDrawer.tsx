import { SimpleGrid } from '@chakra-ui/react'
import AppInput from 'components/redesign/input/AppInput'
import AppSelect from 'components/redesign/select/AppSelect'
import React, { useState } from 'react'
import ShippingDrawer from '../common/ShippingDrawer'
import TwinInputCard from '../common/TwinInputCard'

interface Props {
    isOpen: boolean
    onClose: () => void
    onSave: (rateName: string) => void
}

function ShippingRateDrawer({ isOpen, onClose, onSave }: Props) {
    const [rateName, setRateName] = useState('')

    const handleSave = () => {
        if (!rateName.trim()) return
        onSave(rateName.trim())
        onClose()
        setRateName('')
    }

    return (
        <ShippingDrawer isOpen={isOpen} onClose={onClose}>
            <ShippingDrawer.Header title="Add Shipping Rate" description="Create Shipping Profile" />
            <ShippingDrawer.Body
                display="flex"
                flexDirection="column"
                gap={9}
            >
                <AppSelect
                    label="Set Shipping Rates"
                    isRequired
                    labelAccessor="name"
                    valueAccessor="value"
                    selectProps={{
                        value: rateName,
                        onChange: (e) => setRateName(e.target.value),
                    }}
                    items={[
                        { name: 'Rate 1', value: 'rate1' },
                        { name: 'Rate 2', value: 'rate2' },
                        { name: 'Rate 3', value: 'rate3' },
                    ]}
                />

                <AppSelect
                    label="Configure Custom Rate"
                    isRequired
                    labelAccessor="name"
                    valueAccessor="value"
                    selectProps={{
                        value: rateName,
                        onChange: (e) => setRateName(e.target.value),
                    }}
                    items={[
                        { name: 'Flat Rate', value: 'flat_rate' },
                        { name: 'Weight Based Rate', value: 'weight_based' },
                        { name: 'Order Based Rate', value: 'order_based' },
                    ]}
                />

                <AppInput
                    label='Rate Name'
                    description='Rates are shown to customers as delivery options during checkout.'
                    inputProps={{
                        placeholder: 'i.e. (Standard Shipping, Express Shipping)',
                        isRequired: true,
                    }}
                />

                <TwinInputCard label='Estimated Delivery Time (In Days)'>
                    <SimpleGrid columns={2} gap={4}>
                        <AppInput
                            inputProps={{
                                placeholder: 'From'
                            }}
                        />
                        <AppInput
                            inputProps={{
                                placeholder: 'To'
                            }}
                        />
                    </SimpleGrid>
                </TwinInputCard>
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

export default ShippingRateDrawer