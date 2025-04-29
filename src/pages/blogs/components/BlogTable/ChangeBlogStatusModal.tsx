import { ArchiveMd } from "assets/icons/Action/Archive/ArchiveMd"
import { DoublecheckMd } from "assets/icons/Sign/DoubleCheck/DoublecheckMd"
import useAppToast from "hooks/toast/useToast"
import { Blog } from "lib/apis/blog/interfaces"
import { updateBlogService } from "lib/apis/blog/services"
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
    const { showToast } = useAppToast()
    const invalidateBlogList = useInvalidateBlogList()

    const isDraft = blogPost.isVisible
    const modalConfig = {
        title: isDraft ? "Draft Post" : "Publish Post",
        description: `Are you sure you want to ${isDraft ? "draft" : "publish"} this blog?`,
        confirmText: isDraft ? "Draft" : "Publish",
        icon: isDraft ? <ArchiveMd color="#fff" /> : <DoublecheckMd color="#fff" />
    }

    const { mutate: changeBlogStatus, isLoading } = useMutation({
        mutationFn: () => updateBlogService({ ...blogPost, isVisible: !blogPost.isVisible }),
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
            onConfirm={changeBlogStatus}
            isLoading={isLoading}
            {...modalConfig}
        />
    )
}

export default ChangeBlogStatusModal