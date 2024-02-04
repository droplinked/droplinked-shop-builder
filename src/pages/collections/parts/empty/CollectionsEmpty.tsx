import EmptyTable from 'components/common/table/parts/empty/EmptyTable'
import React from 'react'
import AppIcons from 'assest/icon/Appicons';

interface IProps {
    openModal: Function
}

function CollectionsEmpty({ openModal }: IProps) {
    return (
        <>
            <EmptyTable
                add={{
                    caption: "New Collection",
                    onClick: () => openModal()
                }}
                list={[
                    {
                        icon: <AppIcons.addIcon />,
                        label: "Create collections to categorize your products"
                    },
                    {
                        icon: <AppIcons.ruleIcon />,
                        label: "Set exclusive discounts or access to product collections"
                    },
                    {
                        icon: <AppIcons.collectionIcon />,
                        label: "Manage and organize all collections in one place"
                    }
                ]}
            />
        </>
    )
}

export default CollectionsEmpty