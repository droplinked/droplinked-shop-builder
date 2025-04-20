import Button from 'components/redesign/button/Button';
import React, { useState } from 'react';
import { exportOrdersReportService } from "lib/apis/order/services";
import useAppToast from "hooks/toast/useToast";
import { AxiosError } from "axios";

export default function ExportButton() {
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useAppToast();

    const handleExport = async () => {
        try {
            setIsLoading(true);
            const data = await exportOrdersReportService();
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${Date.now()}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            showToast({ message: (error as AxiosError).message, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            fontSize={14}
            fontWeight={500}
            iconSpacing="6px"
            paddingInline="14px"
            variant='secondary'
            onClick={handleExport}
            isLoading={isLoading}
            isDisabled={isLoading}
        >
            Export
        </Button>
    )
}
