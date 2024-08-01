import { Box, Button, Flex, VStack, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppCard from 'components/common/card/AppCard'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import Pagination from 'components/common/datagrid/parts/pagination/Pagination'
import AppModal from 'components/common/modal/AppModal'
import AppTypography from 'components/common/typography/AppTypography'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import CouponsSettingContext from 'pages/register-pages/pages/coupons/context'
import React, { useContext, useState } from 'react'
import CouponForm from '../form/CouponForm'
import classes from './style.module.scss'
import BasicButton from 'components/common/BasicButton/BasicButton'
import { AxiosError } from 'axios'
import { exportCouponsReport } from 'lib/apis/coupons/addressServices'
import useAppToast from 'functions/hooks/toast/useToast'

function CouponsListContent() {
    const { coupons } = useContext(CouponsSettingContext)
    const [selectedCoupon, setSelectedCoupon] = useState(null)
    const [Code, setCode] = useState(null)
    const [isFetchingCouponsReport, setIsFetchingCouponsReport] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { showToast } = useAppToast()

    const handleExportCouponsReport = async (couponID: string) => {
        try {
            setIsFetchingCouponsReport(true)
            const data = await exportCouponsReport({giftCardId: couponID})
            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a')
            link.href = url
            link.download = `${Date.now()}.xlsx`
            document.body.appendChild(link)
            link.click()
            link.remove()
            setTimeout(() => {
                window.URL.revokeObjectURL(url)
            }, 100)
        } catch (error) {
            showToast({ message: (error as AxiosError).message, type: "error" })
        }
        finally {
            setIsFetchingCouponsReport(false)
        }
    }

    return (
        <>
            <VStack align="stretch">
                <VStack align="stretch" spacing={3}>
                    {coupons.data.map((coupon: any, key: number) => (
                        <AppCard key={key}>
                            <VStack align="stretch" spacing="40px">
                                <Flex color="#C2C2C2" justifyContent="space-between" alignItems="center">
                                    <Flex gap="32px" width="40%" alignItems="center">
                                        <VStack width="20%" align="stretch" className={`${!coupon.isExpired ? classes.active : ''}`}>
                                            {coupon.type === "DISCOUNT" ? <AppIcons.DiscountSetting /> : <AppIcons.GiftSetting />}
                                            <AppTypography fontSize='10px' color="#808080">{capitalizeFirstLetter(coupon.type)}</AppTypography>
                                        </VStack>
                                        <VStack width="100%" align="stretch">
                                            <AppTypography fontSize='14px' fontWeight='bold'>{coupon.name}</AppTypography>
                                            <AppTypography fontSize='12px'>{coupon?.expiryDate}</AppTypography>
                                        </VStack>
                                    </Flex>
                                    <VStack align="stretch">
                                        <AppTypography fontSize='12px'>{coupon.codes.length} {coupon.codes.length > 1 ? 'Codes' : 'Code'}</AppTypography>
                                        <AppTypography fontSize='12px'>{coupon.balance} {coupon.type === "DISCOUNT" ? '%' : 'USD'}</AppTypography>
                                    </VStack>
                                    <Flex alignItems={"center"} gap={9}>
                                        <AppIcons.EditIcon
                                            width={"24px"}
                                            height={"24px"}
                                            cursor={"pointer"}
                                            onClick={() => {
                                                setSelectedCoupon(coupon)
                                                onOpen()
                                            }}
                                        />
                                        <AppIcons.ArrowDown
                                            onClick={() => setCode(prev => prev === key ? null : key)}
                                            style={{
                                                transition: ".3s",
                                                transform: Code === key ? "rotate(180deg)" : '',
                                                cursor: "pointer"
                                            }}
                                        />
                                    </Flex>
                                </Flex>
                                {Code === key && coupon?.codes && coupon.codes.length ? (
                                    <Box color='#C2C2C2'>
                                        <table width="100%" className={classes.table}>
                                            <thead>
                                                <tr>
                                                    <td width="50px"></td>
                                                    <td><AppTypography fontSize="12px">Code</AppTypography></td>
                                                    <td><AppTypography fontSize="12px">Status</AppTypography></td>
                                                    <td width="30px"><Button bgColor={"#1C1C1C"} borderRadius={"6px"} border={"2px solid #292929"} width={"64px"} height={"24px"} padding={"12px 24px"} fontSize={"12px"} color={"#C2C2C2"} isLoading={isFetchingCouponsReport} _hover={{bg: "unset"}} onClick={() => handleExportCouponsReport(coupon?._id)}>Export</Button></td>
                                                    <td width="30px"></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {coupon.codes.map((code: any, keys: number) => (
                                                    <React.Fragment key={keys}>
                                                        <tr>
                                                            <td colSpan={4}>
                                                                <Flex height={"1px"} width={"100%"} bgColor={"#262626"} />
                                                            </td>
                                                        </tr>
                                                        <tr style={{ opacity: code.isRedeemed ? .4 : 1 }}>
                                                            <td>{keys + 1}</td>
                                                            <td><AppTypography fontSize="12px">{code.code}</AppTypography></td>
                                                            <td><AppTypography fontSize="12px">{code.isRedeemed ? "Expired" : "Valid"}</AppTypography></td>
                                                            <td><ClipboardText text={code.code} /></td>
                                                        </tr>
                                                    </React.Fragment>
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
            {
                isOpen && <AppModal open={isOpen} close={onClose} size="xl" title={`Edit ${capitalizeFirstLetter(selectedCoupon.type)} Coupon`}>
                    <CouponForm coupon={selectedCoupon} close={onClose} />
                </AppModal>
            }
        </>
    )
}

export default CouponsListContent
