import { Box, Flex, Radio, RadioGroup, Text, VStack, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppInput from 'components/common/form/textbox/AppInput'
import WithPermission from 'functions/hoc/shop-permissions/WithPermission'
import { getCustomShippingsService } from 'lib/apis/custom-shipping/CustomShippingServices'
import useAppStore, { useHasPermission } from 'lib/stores/app/appStore'
import { productContext } from 'pages/product/single/context'
import { BlackBox, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import CreateCustomShippingModal from '../create-custom-shipping-modal/CreateCustomShippingModal'
import Loading from '../loading/Loading'
import RemoveCustomShippingModal from '../remove-custom-shipping-modal/RemoveCustomShippingModal'

function Shipping() {
    const hasPermission = useHasPermission();
    const { shop: { currency } } = useAppStore();
    const { state: { shippingPrice, shippingType }, methods: { updateState }, loading } = useContext(productContext)
    const { isFetching, data: customShippings, refetch } = useQuery({
        queryKey: "custom-shippings",
        queryFn: () => getCustomShippingsService(),
        enabled: hasPermission("custom_shipping")
    })
    const [targetShipping, setTargetShipping] = useState(null) //To remove custom shipping
    const createShippingModal = useDisclosure()
    const removeShippingModal = useDisclosure()

    const shippings = [
        {
            title: 'Self Managed',
            shippingType: 'CUSTOM',
            description: 'You will handle shipping operations internally.'
        },
        {
            title: 'EASY Post',
            shippingType: 'EASY_POST',
            description: 'EASY Post takes responsibility to deliver your customer orders.'
        }
    ]

    const allShippings = [...shippings, ...(customShippings?.data?.data || [])]

    return (
        <>
            <Flex direction={"column"} gap={8}>
                <Flex direction={"column"} align={"stretch"} gap={4}>
                    {/* header */}
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <FieldLabel isRequired label='Shipping Method' />
                        <WithPermission requiredPermission='custom_shipping' action='hide'>
                            <BasicButton variant='outline' sizes='medium' onClick={createShippingModal.onOpen}>Add Custom Shipping</BasicButton>
                        </WithPermission>
                    </Flex>

                    {/* shipping methods */}
                    <RadioGroup
                        value={shippingType}
                        onChange={(value) => updateState('shippingType', value)}
                    >
                        <VStack align={"stretch"}>
                            {isFetching ? <Loading /> :
                                allShippings.map((el, key) => {
                                    const isCustomShipping = !!el._id
                                    return <Box key={key}>
                                        <BlackBox padding={5}>
                                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                                <Radio alignItems="start" gap={2} size='md' value={el.shippingType} colorScheme='teal'>
                                                    <Flex direction={"column"} gap={2}>
                                                        <TextLabelBold>{el.title}</TextLabelBold>
                                                        {el.description && <Text fontSize="sm" color="lightGray">{el.description}</Text>}
                                                    </Flex>
                                                </Radio>
                                                {
                                                    isCustomShipping && <AppIcons.RedTrash
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            setTargetShipping(el)
                                                            removeShippingModal.onOpen()
                                                        }}
                                                    />
                                                }
                                            </Flex>
                                        </BlackBox>
                                    </Box>
                                })
                            }
                        </VStack>
                    </RadioGroup>
                </Flex>
                {shippingType === "CUSTOM" && (
                    <AppInput
                        type="number"
                        min={0}
                        loading={loading}
                        name="cost"
                        isRequired
                        label='Shipping Cost'
                        placeholder={`${currency.symbol}0.00 ${currency.abbreviation}`}
                        value={shippingPrice}
                        onKeyDown={(e) => {
                            if (e.key === '+' || e.key === '-' || e.key === 'e') e.preventDefault()
                        }}
                        onChange={(e) => updateState("shippingPrice", e.target.value ? parseFloat(e.target.value) : '')}
                    />
                )}
            </Flex>
            <WithPermission requiredPermission='custom_shipping' action='hide'>
                {createShippingModal.isOpen && <CreateCustomShippingModal isOpen={createShippingModal.isOpen} close={createShippingModal.onClose} refetchCustomShippings={refetch} />}
                {removeShippingModal.isOpen && <RemoveCustomShippingModal isOpen={removeShippingModal.isOpen} close={removeShippingModal.onClose} shippingId={targetShipping._id} refetchCustomShippings={refetch} />}
            </WithPermission>
        </>
    )
}

export default Shipping