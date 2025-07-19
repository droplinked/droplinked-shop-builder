import AppDialog from 'components/common/dialog'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useMutation } from 'react-query'
import { IdeleteCollectionService } from 'services/collection/interfaces'
import { deleteCollectionService } from 'services/collection/services'

interface IProps {
    open: boolean
    close: Function
    fetch: Function
    collectionID: string
}
function ConfirmDeleteCollection({ open, close, collectionID, fetch }: IProps) {
    const { mutate, isLoading } = useMutation((params: IdeleteCollectionService) => deleteCollectionService(params))
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("collections");

    return (
        <AppDialog
            open={open}
            close={() => { }}
            title={t("ConfirmDeleteCollection.title")}
            text={t("ConfirmDeleteCollection.confirmationText")}
            buttons={[
                {
                    children: t("common:cancel"),
                    onClick: () => close(),
                    buttonProps: {
                        variant: "outline"
                    }
                },
                {
                    children: t("common:delete"),
                    buttonProps: { isLoading },
                    onClick: () => {
                        mutate({ collectionID }, {
                            onSuccess: () => {
                                showToast({ message: t("ConfirmDeleteCollection.success"), type: "success" })
                                fetch()
                                close()
                            },
                            onError: async () => showToast({ message: t("common:genericError"), type: "error" })
                        })
                    }
                }
            ]}
        />
    )
}

export default ConfirmDeleteCollection