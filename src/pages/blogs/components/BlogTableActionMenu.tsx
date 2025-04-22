import { ArchiveMd } from 'assets/icons/Action/Archive/ArchiveMd'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { ShareMd } from 'assets/icons/Action/Share/ShareMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import { DoublecheckMd } from 'assets/icons/Sign/DoubleCheck/DoublecheckMd'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import React from 'react'

function BlogTableActionMenu({ blogPost }: { blogPost: any }) {
    const isVisible = blogPost.isVisible

    const actions = [
        {
            icon: <EditMd color='#fff' />,
            title: "Edit",
            onClick: () => console.log("Edit")
        },
        {
            icon: isVisible ? <ArchiveMd color='#fff' /> : <DoublecheckMd color='#fff' />,
            title: `${isVisible ? "Draft" : "Publish"} Post`,
            onClick: () => console.log(isVisible ? "Draft" : "Publish"),
        },
        {
            icon: <ShareMd color='#fff' />,
            title: "Share",
            onClick: () => console.log("Share")
        },
        {
            icon: <TrashMd color='#F24' />,
            title: "Remove",
            color: "#F24",
            onClick: () => console.log("Remove")
        }
    ]

    return (
        <TableMenu items={actions} />
    )
}

export default BlogTableActionMenu