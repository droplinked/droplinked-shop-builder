import EmptyTable from 'common/table/parts/empty/EmptyTable'
import React from 'react'
import variantsIcon from "assest/icon/products-active-icon.svg";
import collectionIcon from "assest/icon/collection-active-icon.svg";
import tearIcon from "assest/icon/tear-icon.svg";
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate';

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
                        icon: variantsIcon,
                        label: "Introduce your product"
                    },
                    {
                        icon: collectionIcon,
                        label: "Categorize into a collection"
                    },
                    {
                        icon: tearIcon,
                        label: "Record and track earnings and commissions on-chain"
                    }
                ]}
            />
        </>
    )
}

export default ProductEmpty