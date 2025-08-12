import { Flex, Text } from '@chakra-ui/react'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import { useQuery } from 'react-query'
import { getShippingProviders } from 'services/shipping-management/services'
import LabeledContent from '../common/LabeledContent'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    selected: string[]
    onChange: (services: string[]) => void
}

function ThirdPartyServiceSelector({ selected, onChange }: Props) {
    const { t } = useLocaleResources("shipping-management")
    const { data } = useQuery({
        queryKey: ['shipping-providers'],
        queryFn: getShippingProviders,
    })

    const handleChange = (service: string) => {
        onChange(selected.includes(service)
            ? selected.filter((s) => s !== service)
            : [...selected, service]
        )
    }

    const providers = data ?? []

    return (
        <LabeledContent label={t('ThirdPartyServiceSelector.label')} required>
            {providers.length > 0 && (
                <RuledGrid columns={1} borderRadius={8}>
                    {providers.map((service) => (
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
            )}
        </LabeledContent>
    )
}

export default ThirdPartyServiceSelector