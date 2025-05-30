import { ArchiveMd } from "assets/icons/Action/Archive/ArchiveMd"
import { DoublecheckMd } from "assets/icons/Sign/DoubleCheck/DoublecheckMd"
import useAppToast from "hooks/toast/useToast"
import { Blog } from "services/blog/interfaces"
import { updateBlogService } from "services/blog/services"
import { useInvalidateBlogList } from "pages/blogs/hooks/useBlogs"
import React from "react"
import { useMutation } from "react-query"
import ConfirmationModal from "./ConfirmationModal"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"

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
            showToast({ type: "success", message: t("notifications.statusUpdated") })
            onClose()
            invalidateBlogList()
        },
        onError: () => showToast({ type: "error", message: t("notifications.error.statusUpdate") })
    })

    const title = isDraft ? t("modals.changeStatus.draftTitle") : t("modals.changeStatus.publishTitle")
    const description = isDraft ? t("modals.changeStatus.draftDescription") : t("modals.changeStatus.publishDescription")
    const buttonText = isDraft ? t("modals.changeStatus.draftConfirm") : t("modals.changeStatus.confirm")

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