import React from 'react'
import PopOverMenu from 'common/PopoverMenu/PopOverMenu'
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import { useDisclosure } from '@chakra-ui/react';
import ConfirmDeleteCollection from './parts/modal/ConfirmDeleteCollection';
import RuleModal from 'modals/rule-modal/RuleModal';
import CollectionCreate from '../create/CollectionCreate';

function ControlsListCollection({ collection, fetch }) {
    const deleteModal = useDisclosure()
    const ruleModal = useDisclosure()
    const editModal = useDisclosure()
    const { shopNavigate } = useCustomNavigate()

    return (
        <>
            <PopOverMenu items={[
                {
                    caption: "Edit",
                    onClick: editModal.onOpen
                },
                {
                    caption: "Ruleset",
                    onClick: ruleModal.onOpen
                },
                {
                    caption: "Delete",
                    onClick: deleteModal.onOpen
                }
            ]} />
            <ConfirmDeleteCollection close={deleteModal.onClose} open={deleteModal.isOpen} collectionID={collection?._id} fetch={fetch} />
            <RuleModal collectionId={collection?._id} ruleId={collection?.ruleSetID} update={fetch} close={ruleModal.onClose} show={ruleModal.isOpen} />
            <CollectionCreate close={editModal.onClose} collection={collection} refetch={fetch} open={editModal.isOpen} />
        </>
    )
}

export default ControlsListCollection