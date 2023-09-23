import { Box, Flex, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppInput from 'components/common/form/textbox/AppInput'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTable from 'components/common/table/AppTable'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import classes from './style.module.scss'

function SaleInfromation() {
    const { loading } = useContext(productContext)

    return (
        <VStack align="stretch" spacing="20px">
            <VStack align="stretch">
                <FieldLabel label='Sale Information' isRequired loading={loading} />
                <AppTypography size='14px' color={"#808080"}>??? sale fields</AppTypography>
            </VStack>
            <AppSkeleton isLoaded={loading}>
                <AppTable
                    rows={[
                        {
                            quantity: {
                                caption: 'Quantity',
                                props: {
                                    width: "33%"
                                },
                                value: <AppInput name='Quantity' placeholder='0' width="104px" />
                            },
                            extenalID: {
                                caption: 'Extenal ID',
                                props: {
                                    width: "33%"
                                },
                                value: <AppInput name='price' placeholder='0' width="104px" />
                            },
                            price: {
                                caption: 'Price',
                                props: {
                                    width: "33%"
                                },
                                value: (
                                    <Flex alignItems="end" gap="10px">
                                        <Box width="100px"><AppInput name='price' placeholder='0' width="100%" /></Box>
                                        <AppTypography size='14px' position="relative" bottom="13px" color="#808080">USD</AppTypography>
                                    </Flex>
                                )
                            },
                        }
                    ]}
                />
            </AppSkeleton>
            <Flex alignItems="center" gap="10px">
                <AppIcons.InfoIcon className={classes.icon} />
                <AppTypography size='12px' color="#FEB900">Once you publish your product these information can not be changed</AppTypography>
            </Flex>
        </VStack>
    )
}

export default SaleInfromation