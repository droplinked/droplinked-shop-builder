import AppIcons from 'assest/icon/Appicons';
import TableMenu from 'components/redesign/table-menu/TableMenu';
import React from 'react';
import { Codes } from '../interface';
import { useMutation } from 'react-query';
import { exportCouponsReport } from 'lib/apis/coupons/addressServices';
import { AxiosError } from 'axios';
import useAppToast from 'functions/hooks/toast/useToast';

interface Props {
    onCreateModalOpen: () => void;
    onDetailModalOpen: () => void;
    codes: Codes[];
    couponId: string;
}

export default function DropDownColumn({ onCreateModalOpen, onDetailModalOpen, codes, couponId }: Props) {
    const { showToast } = useAppToast();

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
                        onClick: onDetailModalOpen,
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
        </>
    )
}
