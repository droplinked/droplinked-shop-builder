import { Flex, SimpleGrid, Switch, Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { printServices } from 'services/product/productServices'
import useProductForm from 'pages/products/hooks/useProductForm'
import { getFieldErrorMessage } from 'pages/products/utils/formHelpers'
import React from 'react'
import { useQuery } from 'react-query'
import FormControl from '../../../common/FormControl'
import LoadingPlaceholder from '../../../common/LoadingPlaceholder'

export default function WalletOptions() {
    const { t } = useLocaleResources('products');
    const { data, isFetching } = useQuery({
        queryFn: printServices,
        queryKey: 'printServices',
        staleTime: 1000 * 60 * 60 * 24, // Data is fresh for 24 hours
        cacheTime: 1000 * 60 * 60 * 24 * 7 // Cache persists for 7 days
    })

    const { values: { m2m_services }, setFieldValue, errors } = useProductForm()
    const walletOptions = data?.data?.data || []

    function handleSwitchChange(optionId: string, checked: boolean) {
        const updatedServices = checked
            ? [...m2m_services, optionId]
            : m2m_services.filter(id => id !== optionId)

        setFieldValue("m2m_services", updatedServices)
    }

    return (
        <FormControl
            label={t('ProductForm.pod.walletOptions.label')}
            errorMessage={getFieldErrorMessage(errors.m2m_positions)}
        >
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
        </FormControl>
    )
}

function WalletOption({ option, isChecked, onSwitchChange }) {
    return (
        <Flex
            alignItems="center"
            gap={4}
            border="1px solid"
            borderColor="neutral.gray.800"
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