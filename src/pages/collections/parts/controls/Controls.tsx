import React from 'react'
import PopOverMenu from 'components/shared/PopoverMenu/PopOverMenu'
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import { useMutation } from 'react-query';
import { productDeleteServices } from 'lib/apis/product/productServices';
import { IproductDeleteServices } from 'lib/apis/product/interfaces';
import { useDisclosure } from '@chakra-ui/react';
import ConfirmDeleteProduct from './parts/modal/ConfirmDeleteProduct';

function ControlsListProduct({ productID, fetch }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { shopNavigate } = useCustomNavigate()
    return (
        <>
            <PopOverMenu items={[
                {
                    caption: "Edit",
                    onClick: () => shopNavigate(`product/${productID}`)
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