import { Flex, SimpleGrid, Switch, Text } from '@chakra-ui/react'
import { printServices } from 'lib/apis/product/productServices'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import { useQuery } from 'react-query'
import LoadingPlaceholder from '../../../common/LoadingPlaceholder'
import M2MConfigSection from './M2MConfigSection'

export default function WalletOptions() {
    const { data, isFetching } = useQuery({
        queryFn: printServices,
        queryKey: 'printServices',
        cacheTime: 60 * 60 * 1000,
    })

    const { values: { m2m_services }, setFieldValue } = useProductForm()
    const walletOptions = data?.data?.data || []

    function handleSwitchChange(optionId, checked) {
        const updatedServices = checked
            ? [...m2m_services, optionId]
            : m2m_services.filter(id => id !== optionId)

        setFieldValue('m2m_services', updatedServices)
    }

    return (
        <M2MConfigSection title="Wallet Options">
            {
                isFetching ?
                    <LoadingPlaceholder
                        numberOfSkeletons={6}
                        containerProps={{ columns: { base: 1, md: 2 } }}
                        skeletonProps={{ h: "55px" }}
                    />
                    :
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                        {walletOptions.map(option => (
                            <WalletOption
                                key={option._id}
                                option={option}
                                isChecked={m2m_services.includes(option._id)}
                                onSwitchChange={handleSwitchChange}
                            />
                        ))}
                    </SimpleGrid>
            }
        </M2MConfigSection>
    )
}

function WalletOption({ option, isChecked, onSwitchChange }) {
    return (
        <Flex
            alignItems="center"
            gap={4}
            border="1px solid #292929"
            borderRadius={8}
            padding={4}
        >
            <Switch
                isChecked={isChecked}
                onChange={e => onSwitchChange(option._id, e.target.checked)}
            />
            <Text fontSize={14} color="#FFF">{option.name}</Text>
        </Flex>
    )
}