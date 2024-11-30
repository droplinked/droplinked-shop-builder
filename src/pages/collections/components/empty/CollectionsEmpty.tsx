import AppIcons from 'assest/icon/Appicons';
import EmptyTable from 'components/common/table/parts/empty/EmptyTable';
import React from 'react';

interface IProps {
    handleOpenCreateCollectionModal: () => void
}

function CollectionsEmpty({ handleOpenCreateCollectionModal }: IProps) {
    return (
        <>
            <EmptyTable
                add={{
                    caption: "New Collection",
                    onClick: () => handleOpenCreateCollectionModal()
                }}
                list={[
                    {
                        icon: <AppIcons.AddIcon />,
                        label: "Create collections to categorize your products"
                    },
                    {
                        icon: <AppIcons.RuleIcon />,
                        label: "Set exclusive discounts or access to product collections"
                    },
                    {
                        icon: <AppIcons.CollectionIcon />,
                        label: "Manage and organize all collections in one place"
                    }
                ]}
            />
        </>
    )
}

export default CollectionsEmpty