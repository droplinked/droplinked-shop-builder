import { useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import useDownloadFile from 'hooks/useDownloadFile/useDownloadFile'
import { exportCouponsReport } from 'lib/apis/coupons/addressServices'
import React from 'react'
import { Coupon } from '../interface'
import CouponsEditCreationDrawer from '../modals/coupons-edit-creation/CouponsEditCreationDrawer'
import CouponsInformationDrawer from '../modals/coupons-information/CouponsInformationDrawer'

interface Props {
    couponId: string
    rowData: Coupon
    refetch: () => void
}

export default function DropDownColumn({ couponId, rowData, refetch }: Props) {
    const { isOpen: isInfoOpen, onOpen: openInfo, onClose: closeInfo } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: openEdit, onClose: closeEdit } = useDisclosure()

    const { download: exportCodes } = useDownloadFile({
        fetcher: exportCouponsReport,
        fileNameResolver: () => `${Date.now()}.xlsx`
    })

    return (
        <>
            <TableMenu
                items={[
                    {
                        icon: <AppIcons.Eye stroke='#fff' style={{ width: '20px', height: '20px' }} />,
                        onClick: openInfo,
                        title: 'Details'
                    },
                    {
                        icon: <AppIcons.Edit />,
                        onClick: openEdit,
                        title: 'Edit'
                    },
                    {
                        icon: <AppIcons.Export />,
                        onClick: () => exportCodes({ giftCardId: couponId }),
                        title: 'Export Codes'
                    }
                ]}
            />
            <CouponsInformationDrawer
                coupon={rowData}
                key={rowData._id}
                isOpen={isInfoOpen}
                onClose={closeInfo}
            />
            <CouponsEditCreationDrawer
                refetch={refetch}
                isEdit
                coupon={rowData}
                isOpen={isEditOpen}
                onClose={closeEdit}
            />
        </>
    )
}