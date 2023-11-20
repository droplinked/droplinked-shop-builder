import { Box, Flex, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppCard from 'components/common/card/AppCard'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import Pagination from 'components/common/datagrid/parts/pagination/Pagination'
import AppTypography from 'components/common/typography/AppTypography'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import CouponsSettingContext from 'pages/register-pages/pages/coupons/context'
import React, { useContext, useState } from 'react'
import classes from './style.module.scss'

function CouponsListContent() {
    const { coupons } = useContext(CouponsSettingContext)
    const [Code, setCode] = useState(null)

    return (
        <VStack align="stretch">
            <VStack align="stretch" spacing={3}>
                {coupons.data.map((el: any, key: number) => (
                    <AppCard key={key}>
                        <VStack align="stretch" spacing="40px">
                            <Flex color="#C2C2C2" justifyContent="space-between" alignItems="center">
                                <Flex gap="30px" width="40%" alignItems="center">
                                    <VStack width="20%" align="stretch" className={`${!el.isExpired ? classes.active : ''}`}>
                                        {el.type === "DISCOUNT" ? <AppIcons.DiscountSetting /> : <AppIcons.GiftSetting />}
                                        <AppTypography fontSize='10px' color="#808080">{capitalizeFirstLetter(el.type)}</AppTypography>
                                    </VStack>
                                    <VStack width="100%" align="stretch">
                                        <AppTypography fontSize='14px' fontWeight='bold'>{el.name}</AppTypography>
                                        <AppTypography fontSize='12px'>{el?.expiryDate}</AppTypography>
                                    </VStack>
                                </Flex>
                                <VStack align="stretch">
                                    <AppTypography fontSize='12px'>{el.codes.length} {el.codes.length > 1 ? 'Codes' : 'Code'}</AppTypography>
                                    <AppTypography fontSize='12px'>{el.balance} {el.type === "DISCOUNT" ? '%' : 'USD'}</AppTypography>
                                </VStack>
                                {/* <Box alignSelf="baseline" marginTop="7px"><AppTypography fontSize='10px'>Export</AppTypography></Box> */}
                                <Box>
                                    <AppIcons.ArrowDown
                                        onClick={() => setCode(prev => prev === key ? null : key)}
                                        style={{
                                            transition: ".3s",
                                            transform: Code === key ? "rotate(180deg)" : '',
                                            cursor: "pointer"
                                        }}
                                    />
                                </Box>
                            </Flex>
                            {Code === key && el?.codes && el.codes.length ? (
                                <Box color='#C2C2C2'>
                                    <table width="100%" className={classes.table}>
                                        <thead>
                                            <tr>
                                                <td width="50px"></td>
                                                <td><AppTypography fontSize="12px">Code</AppTypography></td>
                                                <td><AppTypography fontSize="12px">Status</AppTypography></td>
                                                <td width="30px"></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {el.codes.map((code: any, keys: number) => (
                                                <tr key={keys} style={{ opacity: code.isRedeemed ? .4 : 1 }}>
                                                    <td>{keys + 1}</td>
                                                    <td><AppTypography fontSize="12px">{code.code}</AppTypography></td>
                                                    <td><AppTypography fontSize="12px">{code.isRedeemed ? "Expired" : "Valid"}</AppTypography></td>
                                                    <td><ClipboardText text={code.code} /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Box>
                            ) : null}
                        </VStack>
                    </AppCard>
                ))}
            </VStack>
            <Box><Pagination current={coupons.currentPage} lastPage={coupons.totalPages ? parseInt(coupons.totalPages) : 1} nextPage={coupons.hasNextPage || false} prevPage={coupons.hasPreviousPage || false} /></Box>
        </VStack>
    )
}

export default CouponsListContent