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
                    caption: "Add Collection",
                    onClick: () => openModal()
                }}
                list={[
                    {
                        icon: <AppIcons.addIcon />,
                        label: "Introduce your collection"
                    },
                    {
                        icon: <AppIcons.variantsIcon />,
                        label: "Set your inventory variants and quantities"
                    },
                    {
                        icon: <AppIcons.collectionIcon />,
                        label: "Set collection"
                    },
                    {
                        icon: <AppIcons.ruleIcon />,
                        label: "Set Crypto based rules for your purchases"
                    }
                ]}
            />
        </>
    )
}

export default CollectionsEmpty