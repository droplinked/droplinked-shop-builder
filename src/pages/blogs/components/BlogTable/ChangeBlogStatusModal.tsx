import { ArchiveLg } from "assets/icons/Action/Archive/ArchiveLg"
import { DoublecheckLg } from "assets/icons/Sign/DoubleCheck/DoublecheckLg"
import AppConfirmationDialog from "components/redesign/app-confirmation-dialog/AppConfirmationDialog"
import useAppToast from "hooks/toast/useToast"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import { useInvalidateBlogList } from "pages/blogs/hooks/useBlogs"
import React from "react"
import { useMutation } from "react-query"
import { Blog } from "services/blog/interfaces"
import { updateBlogService } from "services/blog/services"

interface Props {
    blogPost: Blog
    isOpen: boolean
    onClose: () => void
}

function ChangeBlogStatusModal({ blogPost, isOpen, onClose }: Props) {
    const isDraft = blogPost.isVisible
    const { showToast } = useAppToast()
    const invalidateBlogList = useInvalidateBlogList()
    const { t } = useLocaleResources("blogs")

    const { mutate: changeBlogStatus, isLoading } = useMutation({
        mutationFn: () => updateBlogService({ ...blogPost, isVisible: !isDraft }),
        onSuccess: () => {
            showToast({ type: "success", message: t("ChangeBlogStatusModal.notifications.statusUpdated") })
            onClose()
            invalidateBlogList()
        },
        onError: () => showToast({ type: "error", message: t('common:genericError') })
    })

    const title = isDraft ? t("ChangeBlogStatusModal.draftTitle") : t("ChangeBlogStatusModal.publishTitle")
    const description = isDraft ? t("ChangeBlogStatusModal.draftDescription") : t("ChangeBlogStatusModal.publishDescription")
    const buttonText = isDraft ? t("ChangeBlogStatusModal.draftConfirm") : t("ChangeBlogStatusModal.confirm")

    return (
        <AppConfirmationDialog
            isOpen={isOpen}
            onClose={onClose}
            icon={isDraft ? <ArchiveLg color="#fff" /> : <DoublecheckLg color="#fff" />}
            title={title}
            description={description}
            variant="default"
            confirmButtonProps={{
                children: buttonText,
                isLoading,
                onClick: () => changeBlogStatus()
            }}
        />
    )
}

export default ChangeBlogStatusModal