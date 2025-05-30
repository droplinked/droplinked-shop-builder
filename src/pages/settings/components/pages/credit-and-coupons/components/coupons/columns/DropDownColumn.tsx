import AppIcons from 'assets/icon/Appicons';
import TableMenu from 'components/redesign/table-menu/TableMenu';
import React from 'react';
import { useMutation } from 'react-query';
import { exportCouponsReport } from 'services/coupons/addressServices';
import { AxiosError } from 'axios';
import useAppToast from 'hooks/toast/useToast';
import { Coupon } from '../interface';
import { useDisclosure } from '@chakra-ui/react';
import CouponsInformationDrawer from '../modals/coupons-information/CouponsInformationDrawer';
import CouponsEditCreationDrawer from '../modals/coupons-edit-creation/CouponsEditCreationDrawer';
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

interface Props {
    couponId: string;
    rowData: Coupon
    refetch: () => void
}

export default function DropDownColumn({ couponId, rowData, refetch }: Props) {
    const { t } = useLocaleResources('settings');
    const { showToast } = useAppToast();
    const { isOpen: isEditModalOpen, onClose: onEditModalClose, onOpen: onEditModalOpen } = useDisclosure()
    const { isOpen: isInformationModalOpen, onClose: onInformationModalClose, onOpen: onInformationModalOpen } = useDisclosure()

    const exportMutation = useMutation(
        () => exportCouponsReport({ giftCardId: couponId }),
        {
            onSuccess: (data) => {
                const url = window.URL.createObjectURL(data);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${Date.now()}.xlsx`;
                document.body.appendChild(link);
                link.click();
                link.remove();
                setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                }, 100);
            },
            onError: (error: AxiosError) => {
                showToast({ message: error.message, type: "error" });
            }
        }
    );

    return (
        <>
            <TableMenu
                items={[
                    {
                        icon: <AppIcons.Eye stroke='#fff' style={{ width: "20px", height: "20px" }} />,
                        onClick: onInformationModalOpen,
                        title: t("settings.coupons.tableMenu.details")
                    },
                    {
                        icon: <AppIcons.Edit />,
                        onClick: onEditModalOpen,
                        title: t("settings.coupons.tableMenu.edit")
                    },
                    {
                        icon: <AppIcons.Export />,
                        onClick: () => exportMutation.mutate(),
                        title: t("settings.coupons.tableMenu.exportCodes"),
                    }
                ]}
            />
            <CouponsInformationDrawer coupon={rowData} key={rowData._id} isOpen={isInformationModalOpen} onClose={onInformationModalClose} />
            <CouponsEditCreationDrawer refetch={refetch} isEdit={true} coupon={rowData} isOpen={isEditModalOpen} onClose={onEditModalClose} />
        </>
    )
}
