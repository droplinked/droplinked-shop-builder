import EmptyTable from 'components/common/table/parts/empty/EmptyTable'
import React from 'react'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import AppIcons from 'assest/icon/Appicons';

function ProductEmpty() {
    const { shopNavigate } = useCustomNavigate()
    return (
        <>
            <EmptyTable
                add={{
                    caption: "New Product",
                    onClick: () => shopNavigate("products/create")
                }}
                list={[
                    {
                        icon: <AppIcons.VariantsIcon />,
                        label: "Add your physical and digital products "
                    },
                    {
                        icon: <AppIcons.ManageIcon />,
                        label: "Track and manage inventory"
                    },
                    {
                        icon: <AppIcons.TearIcon />,
                        label: "Decentralize earnings and commissions on-chain"
                    }
                ]}
            />
        </>
    )
}

export default ProductEmpty