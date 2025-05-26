import { ArchiveMd } from "assets/icons/Action/Archive/ArchiveMd"
import { DoublecheckMd } from "assets/icons/Sign/DoubleCheck/DoublecheckMd"
import useAppToast from "hooks/toast/useToast"
import { Blog } from "services/blog/interfaces"
import { updateBlogService } from "services/blog/services"
import { useInvalidateBlogList } from "pages/blogs/hooks/useBlogs"
import React from "react"
import { useMutation } from "react-query"
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
    const { mutate: changeBlogStatus, isLoading } = useMutation({
        mutationFn: () => updateBlogService({ ...blogPost, isVisible: !isDraft }),
        onSuccess: () => {
            showToast({ type: "success", message: "Blog status updated successfully" })
            onClose()
            invalidateBlogList()
        },
        onError: () => showToast({ type: "error", message: "Failed to update blog status" })
    })

    return (
        <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            title={isDraft ? "Draft Post" : "Publish Post"}
            description={`Are you sure you want to ${isDraft ? "draft" : "publish"} this blog?`}
            icon={isDraft ? <ArchiveMd color="#fff" /> : <DoublecheckMd color="#fff" />}
            confirmButtonProps={{
                children: isDraft ? "Draft" : "Publish",
                isLoading,
                onClick: () => changeBlogStatus()
            }}
        />
    )
}

export default ChangeBlogStatusModal