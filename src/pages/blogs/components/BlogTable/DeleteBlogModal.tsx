import { TrashMd } from "assets/icons/Action/Trash/TrashMd"
import useAppToast from "hooks/toast/useToast"
import { Blog } from "services/blog/interfaces"
import { deleteBlogService } from "services/blog/services"
import { useInvalidateBlogList } from "pages/blogs/hooks/useBlogs"
import React from "react"
import { useMutation } from "react-query"
import ConfirmationModal from "./ConfirmationModal"

interface Props {
    blogPost: Blog
    isOpen: boolean
    onClose: () => void
}

function DeleteBlogModal({ blogPost, isOpen, onClose }: Props) {
    const { showToast } = useAppToast()
    const invalidateBlogList = useInvalidateBlogList()

    const { mutate: deleteBlog, isLoading } = useMutation({
        mutationFn: () => deleteBlogService(blogPost._id),
        onSuccess: () => {
            showToast({ type: "success", message: "Blog removed successfully" })
            onClose()
            invalidateBlogList()
        },
        onError: () => showToast({ type: "error", message: "Failed to remove blog" })
    })

    return (
        <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            title="Remove Blog"
            description="Are you sure you want to remove this blog? This action cannot be undone"
            icon={<TrashMd color="#fff" />}
            confirmButtonProps={{
                variant: "normal",
                bgColor: "system.error",
                color: "text.white",
                children: "Remove",
                isLoading,
                onClick: () => deleteBlog()
            }}
        />
    )
}

export default DeleteBlogModal