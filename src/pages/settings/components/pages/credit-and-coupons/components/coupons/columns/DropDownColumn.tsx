import AppIcons from 'assest/icon/Appicons';
import TableMenu from 'components/redesign/table-menu/TableMenu';
import React from 'react';
import { useMutation } from 'react-query';
import { exportCouponsReport } from 'lib/apis/coupons/addressServices';
import { AxiosError } from 'axios';
import useAppToast from 'functions/hooks/toast/useToast';
import { Coupon } from '../interface';
import { useDisclosure } from '@chakra-ui/react';
import CouponsInformationModal from '../modals/coupons-information/CouponsInformationModal';

interface Props {
    couponId: string;
    rowData: Coupon
}

export default function DropDownColumn({ couponId, rowData }: Props) {
    const { showToast } = useAppToast();
    const { isOpen: isCreateModalOpen, onClose: onCreateModalClose, onOpen: onCreateModalOpen } = useDisclosure()
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
                        title: "Details"
                    },
                    {
                        icon: <AppIcons.Edit />,
                        onClick: onCreateModalOpen,
                        title: "Edit"
                    },
                    {
                        icon: <AppIcons.Export />,
                        onClick: () => exportMutation.mutate(),
                        title: "Export Codes",
                    }
                ]}
            />
            <CouponsInformationModal coupon={rowData} key={rowData._id} isOpen={isInformationModalOpen} onClose={onInformationModalClose} />
        </>
    )
}
