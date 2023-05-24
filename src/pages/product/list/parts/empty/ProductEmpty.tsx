import EmptyTable from 'common/table/parts/empty/EmptyTable'
import React from 'react'
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate';
import AppIcons from 'assest/icon/Appicons';

function ProductEmpty() {
    const { shopNavigate } = useCustomNavigate()
    return (
        <>
            <EmptyTable
                add={{
                    caption: "New product",
                    onClick: () => shopNavigate("products/create")
                }}
                list={[
                    {
                        icon: <AppIcons.variantsIcon />,
                        label: "Add your physical and digital products "
                    },
                    {
                        icon: <AppIcons.manageIcon />,
                        label: "Track and manage inventory"
                    },
                    {
                        icon: <AppIcons.tearIcon />,
                        label: "Decentralize earnings and commissions on-chain"
                    }
                ]}
            />
        </>
    )
}

export default ProductEmpty