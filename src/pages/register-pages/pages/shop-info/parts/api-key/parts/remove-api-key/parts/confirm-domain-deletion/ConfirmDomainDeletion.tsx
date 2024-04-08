import AppDialog from 'components/common/dialog';
import useAppToast from 'functions/hooks/toast/useToast';
import React, { useContext } from 'react';
import APIKeyContext from '../../../../context';

interface Props {
    isOpen: boolean;
    close: Function;
    selectedDomain: string;
}

function ConfirmDomainDeletion({ isOpen, close, selectedDomain }: Props) {
    const { getShopAPIKey, updateShopAPIKey, fetchedData } = useContext(APIKeyContext)
    const isLoading = getShopAPIKey.isLoading || updateShopAPIKey.isLoading
    const { showToast } = useAppToast()

    const removeDomain = async () => {
        try {
            if (fetchedData?.domains.length === 1) return
            const domains = [...fetchedData?.domains]
            domains.splice(fetchedData?.domains.indexOf(selectedDomain), 1)
            await updateShopAPIKey.mutateAsync({ domains: [...domains] })
            await getShopAPIKey.refetch()
            close()
        } catch (error) {
            showToast({ message: (error as Error).message, type: "error" })
        }
    }

    return (
        <AppDialog
            open={isOpen}
            close={() => { }}
            title="Delete Domain"
            text={"Are you sure you want to delete this Domain?"}
            buttons={[
                {
                    children: "Cancel",
                    onClick: close,
                    buttonProps: { variant: "outline" }
                },
                {
                    children: "Delete",
                    buttonProps: { isLoading },
                    onClick: removeDomain
                }
            ]}
        />
    )
}

export default ConfirmDomainDeletion