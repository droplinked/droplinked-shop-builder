import AppDialog from 'components/common/dialog';
import React, { useContext } from 'react';
import APIKeyContext from '../../context';

interface Props {
    isOpen: boolean;
    close: Function;
    selectedDomain: string;
}

function ConfirmDomainDeletion({ isOpen, close, selectedDomain }: Props) {
    const { getShopAPIKey, updateShopAPIKey, fetchedData } = useContext(APIKeyContext)

    const removeDomain = async () => {
        try {
            if (fetchedData?.domains.length === 1) return
            const newDomains = fetchedData?.domains.filter(d => d !== selectedDomain)
            await updateShopAPIKey.mutateAsync({ domains: [...newDomains] })
            getShopAPIKey.refetch()
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
                    buttonProps: { isLoading: updateShopAPIKey.isLoading },
                    onClick: removeDomain
                }
            ]}
        />
    )
}

export default ConfirmDomainDeletion

function showToast(arg0: { message: string; type: string }) {
    throw new Error('Function not implemented.')
}
