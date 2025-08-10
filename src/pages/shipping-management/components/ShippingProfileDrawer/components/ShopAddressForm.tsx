import { Flex, SimpleGrid } from '@chakra-ui/react'
import AppInput from 'components/redesign/input/AppInput'
import AppSelect from 'components/redesign/select/AppSelect'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import LabeledContent from '../../common/LabeledContent'

function ShopAddressForm() {
    const { t } = useLocaleResources("common")

    return (
        <LabeledContent label='Shop Address'>
            <Flex
                direction='column'
                gap={9}
                border="1px solid"
                borderColor="neutral.gray.800"
                borderRadius={8}
                padding={4}
                sx={{ input: { fontSize: 16 } }}
            >
                <SimpleGrid columns={2} gap={4}>
                    <AppInput
                        label='First Name'
                        inputProps={{

                            isRequired: true,
                            placeholder: 'John',
                        }}
                    />
                    <AppInput
                        label='Last Name'
                        inputProps={{
                            isRequired: true,
                            placeholder: 'Doe',
                        }}
                    />
                </SimpleGrid>

                <Flex direction='column' gap={6}>
                    <AppInput
                        label='Address Line 1'
                        inputProps={{
                            isRequired: true,
                            placeholder: 'e.g., 123 Main St, PO Box 456',
                        }}
                    />
                    <AppInput
                        label='Address Line 2'
                        inputProps={{
                            placeholder: 'e.g., Apt 4B, Suite 205, Building 7',
                        }}
                    />
                </Flex>

                <Flex direction='column' gap={6}>
                    <SimpleGrid columns={2} gap={4}>
                        <AppSelect
                            label='Country'
                            selectProps={{
                                isRequired: true,
                                placeholder: 'Country',
                            }}
                            items={[]}
                        />

                        <AppSelect
                            label='State'
                            selectProps={{
                                isRequired: true,
                                placeholder: 'State',
                            }}
                            items={[]}
                        />
                    </SimpleGrid>

                    <SimpleGrid columns={2} gap={4}>
                        <AppSelect
                            label='City'
                            selectProps={{
                                isRequired: true,
                                placeholder: 'City',
                            }}
                            items={[]}
                        />

                        <AppInput
                            label='Zip Code'
                            inputProps={{
                                isRequired: true,
                                placeholder: '10001',
                            }}
                        />
                    </SimpleGrid>
                </Flex>
            </Flex>
        </LabeledContent>
    )
}

export default ShopAddressForm