import { ModalBody } from '@chakra-ui/react'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import Button from 'components/redesign/button/Button'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useAppToast from 'hooks/toast/useToast'
import { Blog } from 'lib/apis/blog/interfaces'
import { deleteBlogService } from 'lib/apis/blog/services'
import React from 'react'
import { useMutation } from 'react-query'
import { useInvalidateBlogList } from '../hooks/useBlogs'

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
            showToast({ type: "success", message: "Blog deleted successfully" })
            onClose()
            invalidateBlogList()
        },
        onError: () => showToast({ type: "error", message: "Failed to delete blog" })
    })

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "xl", isCentered: true }}
            modalContentProps={{ width: "600px", gap: 0, paddingBlock: 0, bg: "#141414" }}
        >
            <ModalHeaderData
                icon={<TrashMd color='#fff' />}
                title="Delete Blog"
                description="Are you sure you want to delete this blog? This action cannot be undone."
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                    paddingBottom: { lg: "36px !important", md: "32px !important", base: "16px !important" }
                }}
            />

            <ModalBody display="flex" justifyContent="space-between" mb="8" bg="#141414" overflow="hidden">
                <Button variant="secondary" isDisabled={false} onClick={onClose}>
                    Cancel
                </Button>
                <Button isLoading={isLoading} isDisabled={isLoading} onClick={() => deleteBlog()}>
                    Delete
                </Button>
            </ModalBody>
        </AppModal>
    )
}

export default DeleteBlogModal