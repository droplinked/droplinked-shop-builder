import React from 'react'
import PopOverMenu from 'components/common/PopoverMenu/PopOverMenu'
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import { useDisclosure } from '@chakra-ui/react';
import ConfirmDeleteProduct from './parts/modal/ConfirmDeleteCollection';

function ControlsListProduct({ productID, product, fetch }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { shopNavigate } = useCustomNavigate()
    return (
        <>
            <PopOverMenu items={[
                {
                    caption: "Edit",
                    onClick: () => shopNavigate(`products/${productID}`)
                },
                {
                    caption: "Delete",
                    onClick: onOpen
                }
            ]} />
            <ConfirmDeleteProduct close={onClose} open={isOpen} productID={productID} fetch={fetch} />
        </>
    )
}

export default ControlsListProduct