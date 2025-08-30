import { TrashLg } from 'assets/icons/Action/Trash/TrashLg'
import AppConfirmationDialog from 'components/redesign/app-confirmation-dialog/AppConfirmationDialog'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useMutation } from 'react-query'
import { deleteCollectionService } from 'services/collection/services'

interface IProps {
    open: boolean
    close: () => void
    fetch: () => void
    collectionID: string
}

function ConfirmDeleteCollection({ open, close, collectionID, fetch }: IProps) {
    const { mutateAsync, isLoading } = useMutation((collectionID: string) => deleteCollectionService(collectionID))
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("collections")

    const handleDelete = async () => {
        try {
            await mutateAsync(collectionID)
            showToast({ message: t("ConfirmDeleteCollection.success"), type: "success" })
            fetch()
            close()
        } catch (error) {
            showToast({ message: t("common:genericError"), type: "error" })
        }
    }

    return (
        <AppConfirmationDialog
            isOpen={open}
            onClose={close}
            icon={<TrashLg color='#fff' />}
            title={t("ConfirmDeleteCollection.title")}
            description={t("ConfirmDeleteCollection.confirmationText")}
            variant='delete'
            confirmButtonProps={{
                children: t("common:delete"),
                isLoading,
                onClick: handleDelete
            }}
        />
    )
}

export default ConfirmDeleteCollection