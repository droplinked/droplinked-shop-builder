import React from 'react'
import PopOverMenu from 'components/shared/PopoverMenu/PopOverMenu'
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";

function ControlsListProduct({ productID }) {
    const { shopNavigate } = useCustomNavigate()
    return (
        <PopOverMenu items={[
            {
                caption: "Edit",
                onClick: () => shopNavigate(`product/${productID}`)
            },
            {
                caption: "Delete",
                onClick: () => { }
            }
        ]} />
    )
}

export default ControlsListProduct