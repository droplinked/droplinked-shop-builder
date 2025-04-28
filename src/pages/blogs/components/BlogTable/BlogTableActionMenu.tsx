import { useDisclosure } from '@chakra-ui/react'
import { ArchiveMd } from 'assets/icons/Action/Archive/ArchiveMd'
import { ShareMd } from 'assets/icons/Action/Share/ShareMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import { DoublecheckMd } from 'assets/icons/Sign/DoubleCheck/DoublecheckMd'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import useAppToast from 'hooks/toast/useToast'
import useShopUrl from 'hooks/useShopUrl/useShopUrl'
import { Blog } from 'lib/apis/blog/interfaces'
import React from 'react'
import ChangeBlogStatusModal from '../ChangeBlogStatusModal'
import DeleteBlogModal from '../DeleteBlogModal'

interface Props {
    blogPost: Blog
}

function BlogTableActionMenu({ blogPost }: Props) {
    const { isOpen: isChangeStatusOpen, onOpen: onChangeStatusOpen, onClose: onChangeStatusClose } = useDisclosure()
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const shopUrl = useShopUrl()
    const { showToast } = useAppToast()

    const { isVisible, slug } = blogPost

    const copyBlogLink = () => {
        const blogLink = `${shopUrl}/blogs/${slug}`
        navigator.clipboard.writeText(blogLink)
        showToast({ type: "success", message: "Link copied to clipboard" })
    }

    const actions = [
        {
            icon: isVisible ? <ArchiveMd color='#fff' /> : <DoublecheckMd color='#fff' />,
            title: `${isVisible ? "Draft" : "Publish"} Post`,
            onClick: onChangeStatusOpen
        },
        {
            icon: <ShareMd color='#fff' />,
            title: "Share",
            onClick: copyBlogLink
        },
        {
            icon: <TrashMd color='#F24' />,
            title: "Remove",
            color: "#F24",
            onClick: onDeleteOpen
        }
    ]

    return (
        <>
            <TableMenu items={actions} />
            <ChangeBlogStatusModal blogPost={blogPost} isOpen={isChangeStatusOpen} onClose={onChangeStatusClose} />
            <DeleteBlogModal blogPost={blogPost} isOpen={isDeleteOpen} onClose={onDeleteClose} />
        </>
    )
}

export default BlogTableActionMenu