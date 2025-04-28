import { ModalBody } from "@chakra-ui/react"
import { ArchiveMd } from "assets/icons/Action/Archive/ArchiveMd"
import { DoublecheckMd } from "assets/icons/Sign/DoubleCheck/DoublecheckMd"
import Button from "components/redesign/button/Button"
import AppModal from "components/redesign/modal/AppModal"
import ModalHeaderData from "components/redesign/modal/ModalHeaderData"
import useAppToast from "hooks/toast/useToast"
import { Blog } from "lib/apis/blog/interfaces"
import { updateBlogService } from "lib/apis/blog/services"
import React from "react"
import { useMutation } from "react-query"
import { useInvalidateBlogList } from "../hooks/useBlogs"

interface Props {
    blogPost: Blog
    isOpen: boolean
    onClose: () => void
}

function ChangeBlogStatusModal({ blogPost, isOpen, onClose }: Props) {
    const { showToast } = useAppToast()
    const invalidateBlogList = useInvalidateBlogList()

    const isDraft = blogPost.isVisible
    const statusTitle = isDraft ? "Draft Post" : "Publish Post"
    const statusDescription = `Are you sure you want to ${isDraft ? "draft" : "publish"} this blog?`
    const statusButtonText = isDraft ? "Draft" : "Publish"
    const statusIcon = isDraft ? <ArchiveMd color='#fff' /> : <DoublecheckMd color='#fff' />

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
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "xl", isCentered: true }}
            modalContentProps={{ width: "600px", gap: 0, paddingBlock: 0, bg: "#141414" }}
        >
            <ModalHeaderData
                icon={statusIcon}
                title={statusTitle}
                description={statusDescription}
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                    paddingBottom: { lg: "36px !important", md: "32px !important", base: "16px !important" }
                }}
            />

            <ModalBody display="flex" justifyContent="space-between" mb="8" bg="#141414" overflow="hidden">
                <Button variant="secondary" isDisabled={isLoading} onClick={onClose}>
                    Cancel
                </Button>
                <Button isLoading={isLoading} isDisabled={isLoading} onClick={() => changeBlogStatus()}>
                    {statusButtonText}
                </Button>
            </ModalBody>
        </AppModal>
    )
}

export default ChangeBlogStatusModal