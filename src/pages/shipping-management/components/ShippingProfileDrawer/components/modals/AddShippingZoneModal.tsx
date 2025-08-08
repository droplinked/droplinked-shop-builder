import React, { useState } from 'react'
import { Flex, Box, Text, Checkbox, CheckboxGroup, Input } from '@chakra-ui/react'
import ShippingDrawer from '../../../common/ShippingDrawer'
import AppInput from 'components/redesign/input/AppInput'

export interface ShippingZone {
    id: number
    name: string
    countries: string[]
    rates: ShippingRate[]
}

export interface ShippingRate {
    id: number
    name: string
}

interface Props {
    isOpen: boolean
    onClose: () => void
    onSave: (zone: Omit<ShippingZone, 'id' | 'rates'>) => void
}

// A very simple representation of countries / zones list to imitate the UI in the provided screenshot
const COUNTRIES = [
    'Worldwide',
    'European Union',
    'Belgium',
    'Greece',
    'Lithuania',
    'Portugal',
    'Afghanistan',
    'Albania',
    'Algeria',
    'Angola',
]

function AddShippingZoneModal({ isOpen, onClose, onSave }: Props) {
    const [zoneName, setZoneName] = useState('')
    const [selectedCountries, setSelectedCountries] = useState<string[]>([])

    const handleSave = () => {
        if (!zoneName.trim()) return

        onSave({ name: zoneName.trim(), countries: selectedCountries })
        onClose()
        // reset state after closing
        setZoneName('')
        setSelectedCountries([])
    }

    return (
        <ShippingDrawer isOpen={isOpen} onClose={onClose}>
            <ShippingDrawer.Header title="Add Shipping Zone" description="Create Shopping Profile" />
            <ShippingDrawer.Body>
                <Flex flexDirection="column" gap={6} padding={9}>
                    <AppInput
                        label="Zone Name"
                        inputProps={{
                            placeholder: 'Enter zone name',
                            value: zoneName,
                            onChange: (e) => setZoneName(e.target.value),
                            isRequired: true,
                        }}
                    />

                    <Flex flexDirection="column" gap={3}>
                        <Text fontSize={16} fontWeight={500} color="text.white">
                            Choose Zone or Country
                        </Text>
                        <Input
                            placeholder="Search by country or zone"
                            border="1px solid"
                            borderColor="neutral.gray.800"
                            borderRadius={8}
                            padding={3}
                            bg="transparent"
                            color="text.white"
                            _placeholder={{ color: 'text.subtext.placeholder.dark' }}
                        />
                        <Box
                            maxHeight="240px"
                            overflowY="auto"
                            border="1px solid"
                            borderColor="neutral.gray.800"
                            borderRadius={8}
                            padding={3}
                        >
                            <CheckboxGroup
                                colorScheme="green"
                                value={selectedCountries}
                                onChange={(val) => setSelectedCountries(val as string[])}
                            >
                                <Flex flexDirection="column" gap={2}>
                                    {COUNTRIES.map((country) => (
                                        <Checkbox key={country} value={country} color="text.white">
                                            {country}
                                        </Checkbox>
                                    ))}
                                </Flex>
                            </CheckboxGroup>
                        </Box>
                    </Flex>
                </Flex>
            </ShippingDrawer.Body>

            <ShippingDrawer.Footer
                primaryText="Save"
                secondaryText="Discard"
                onPrimary={handleSave}
                onSecondary={onClose}
                primaryButtonProps={{ isDisabled: !zoneName.trim() }}
            />
        </ShippingDrawer>
    )
}

export default AddShippingZoneModal

