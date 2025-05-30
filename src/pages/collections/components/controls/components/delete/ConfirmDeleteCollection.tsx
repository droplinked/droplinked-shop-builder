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
    const { t } = useLocaleResources("collections");
    const { mutate, isLoading } = useMutation((params: IdeleteCollectionService) => deleteCollectionService(params))
    const { showToast } = useAppToast()

    return (
        <AppDialog
            open={open}
            close={() => { }}
            title={t("delete.title")}
            text={t("delete.confirmationText")}
            buttons={[
                {
                    children: t("cancel"),
                    onClick: () => close(),
                    buttonProps: {
                        variant: "outline"
                    }
                },
                {
                    children: t("delete"),
                    buttonProps: { isLoading },
                    onClick: () => {
                        mutate({ collectionID }, {
                            onSuccess: () => {
                                showToast({ message: t("delete.success"), type: "success" })
                                fetch()
                                close()
                            },
                            onError: async () => showToast({ message: t("genericErrorMessage"), type: "error" })
                        })
                    }
                }
            ]}
        />
    )
}

export default ConfirmDeleteCollection