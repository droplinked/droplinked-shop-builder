import { TrashMd } from "assets/icons/Action/Trash/TrashMd"
import useAppToast from "hooks/toast/useToast"
import { Blog } from "services/blog/interfaces"
import { deleteBlogService } from "services/blog/services"
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

function DeleteBlogModal({ blogPost, isOpen, onClose }: Props) {
    const { showToast } = useAppToast()
    const invalidateBlogList = useInvalidateBlogList()
    const { t } = useLocaleResources("blogs")

    const { mutate: deleteBlog, isLoading } = useMutation({
        mutationFn: () => deleteBlogService(blogPost._id),
        onSuccess: () => {
            showToast({ type: "success", message: t("notifications.deleted") })
            onClose()
            invalidateBlogList()
        },
        onError: () => showToast({ type: "error", message: t("notifications.error.delete") })
    })

    return (
        <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            title={t("modals.delete.title")}
            description={t("modals.delete.description")}
            icon={<TrashMd color="#fff" />}
            confirmButtonProps={{
                variant: "normal",
                bgColor: "system.error",
                color: "text.white",
                children: t("modals.delete.confirm"),
                isLoading,
                onClick: () => deleteBlog()
            }}
        />
    )
}

export default DeleteBlogModal