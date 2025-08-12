import { CopyMd } from 'assets/icons/Action/Copy/CopyMd'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import { Star1Md } from 'assets/icons/System/Star1/Star1Md'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import { UserTemplateCardProps } from 'pages/template-designer/types/types'
import React from 'react'

interface Props {
    template: UserTemplateCardProps
}

function UserTemplateCardMenu({ template }: Props) {
    const menuItems = [
        {
            icon: <Star1Md color='#fff' />,
            title: 'Set as Primary',
            onClick: () => {
                console.log('Set as Primary', template.id)
            },
        },
        {
            icon: <EditMd color='#fff' />,
            title: 'Rename',
            onClick: () => {
                console.log('Rename template', template.id)
            },
        },
        {
            icon: <CopyMd color='#fff' />,
            title: 'Duplicate',
            onClick: () => {
                console.log('Duplicate template', template.id)
            },
        },
        {
            icon: <TrashMd color='#ff2244' />,
            title: 'Remove',
            color: '#ff2244',
            onClick: () => {
                console.log('Remove template', template.id)
            },
        }
    ]

    return (
        <TableMenu
            placement="bottom-end"
            menuButtonProps={{ flexShrink: 0, padding: '10px' }}
            items={menuItems}
        />
    )
}

export default UserTemplateCardMenu 