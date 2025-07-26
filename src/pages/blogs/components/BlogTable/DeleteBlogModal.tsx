import { TrashMd } from "assets/icons/Action/Trash/TrashMd"
import useAppToast from "hooks/toast/useToast"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import { useInvalidateBlogList } from "pages/blogs/hooks/useBlogs"
import React from "react"
import { useMutation } from "react-query"
import { Blog } from "services/blog/interfaces"
import { deleteBlogService } from "services/blog/services"
import ConfirmationModal from "./ConfirmationModal"

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
            showToast({ type: "success", message: t("DeleteBlogModal.notifications.deleted") })
            onClose()
            invalidateBlogList()
        },
        onError: () => showToast({ type: "error", message: t('common:genericError') })
    })

    return (
        <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            title={t("DeleteBlogModal.title")}
            description={t("DeleteBlogModal.description")}
            icon={<TrashMd color="#fff" />}
            confirmButtonProps={{
                variant: "normal",
                bgColor: "system.error",
                color: "text.white",
                children: t("common:remove"),
                isLoading,
                onClick: () => deleteBlog()
            }}
        />
    )
}

export default DeleteBlogModal