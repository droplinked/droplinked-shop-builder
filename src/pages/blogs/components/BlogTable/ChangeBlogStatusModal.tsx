import { ArchiveMd } from "assets/icons/Action/Archive/ArchiveMd"
import { DoublecheckMd } from "assets/icons/Sign/DoubleCheck/DoublecheckMd"
import useAppToast from "hooks/toast/useToast"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import { useInvalidateBlogList } from "pages/blogs/hooks/useBlogs"
import React from "react"
import { useMutation } from "react-query"
import { Blog } from "services/blog/interfaces"
import { updateBlogService } from "services/blog/services"
import ConfirmationModal from "./ConfirmationModal"

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
        <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={description}
            icon={isDraft ? <ArchiveMd color="#fff" /> : <DoublecheckMd color="#fff" />}
            confirmButtonProps={{
                children: buttonText,
                isLoading,
                onClick: () => changeBlogStatus()
            }}
        />
    )
}

export default ChangeBlogStatusModal