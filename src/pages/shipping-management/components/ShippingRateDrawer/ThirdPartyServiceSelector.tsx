import { Flex, Text } from '@chakra-ui/react'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import LabeledContent from '../common/LabeledContent'

interface Props {
    selected: string[]
    onChange: (services: string[]) => void
}

const AVAILABLE_SERVICES = [
    'FedEx',
    'UPS',
    'DHL',
    'USPS',
]

function ThirdPartyServiceSelector({ selected, onChange }: Props) {
    const handleChange = (service: string) => {
        onChange(selected.includes(service)
            ? selected.filter((s) => s !== service)
            : [...selected, service]
        )
    }

    return (
        <LabeledContent label="Shipping Services">
            <RuledGrid columns={1} borderRadius={8}>
                {AVAILABLE_SERVICES.map((service) => (
                    <Flex
                        key={service}
                        alignItems="center"
                        gap={3}
                        padding="12px 16px"
                    >
                        <Checkbox
                            value={service}
                            isChecked={selected.includes(service)}
                            onChange={() => handleChange(service)}
                        />
                        <Text color="text.white">{service}</Text>
                    </Flex>
                ))}
            </RuledGrid>
        </LabeledContent>
    )
}

export default ThirdPartyServiceSelector