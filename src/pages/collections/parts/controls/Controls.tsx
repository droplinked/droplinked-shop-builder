import React from 'react'
import PopOverMenu from 'components/shared/PopoverMenu/PopOverMenu'
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import { useDisclosure } from '@chakra-ui/react';
import ConfirmDeleteCollection from './parts/modal/ConfirmDeleteCollection';
import RuleModal from 'modals/rule-modal/RuleModal';

function ControlsListCollection({ collectionID, fetch }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { shopNavigate } = useCustomNavigate()
    return (
        <>
            <PopOverMenu items={[
                {
                    caption: "Edit",
                    onClick: () => shopNavigate(`product/${collectionID}`)
                },
                {
                    caption: "Ruleset",
                    onClick: onOpen
                },
                {
                    caption: "Delete",
                    onClick: onOpen
                }
            ]} />
            <ConfirmDeleteCollection close={onClose} open={isOpen} collectionID={collectionID} fetch={fetch} />
            {/* <RuleModal /> */}
        </>
    )
}

export default ControlsListCollection