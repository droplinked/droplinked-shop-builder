import { useDisclosure } from '@chakra-ui/react';
import PopOverMenu from 'components/common/PopoverMenu/PopOverMenu';
import { useCheckPermission } from 'lib/stores/app/shopPermissionsStore';
import React from 'react';
import CollectionCreate from '../create/CollectionCreate';
import ConfirmDeleteCollection from './parts/delete/ConfirmDeleteCollection';
import RuleModal from './parts/rulesets/RuleModal';

function ControlsListCollection({ collection, fetch }) {
    const checkPermissionAndShowToast = useCheckPermission()
    const deleteModal = useDisclosure()
    const ruleModal = useDisclosure()
    const editModal = useDisclosure()

    const handleOpenRulesetModal = () => {
        if (collection.ruleSetID) {
            ruleModal.onOpen()
            return
        }
        if (!checkPermissionAndShowToast("rulesets")) return
        ruleModal.onOpen()
    }

    return (
        <>
            <PopOverMenu items={[
                {
                    caption: "Edit",
                    onClick: editModal.onOpen
                },
                {
                    caption: "Ruleset",
                    onClick: handleOpenRulesetModal
                },
                {
                    caption: "Delete",
                    onClick: deleteModal.onOpen
                }
            ]} />
            <ConfirmDeleteCollection close={deleteModal.onClose} open={deleteModal.isOpen} collectionID={collection?._id} fetch={fetch} />
            {ruleModal.isOpen && <RuleModal collectionId={collection?._id} ruleId={collection?.ruleSetID} update={fetch} close={ruleModal.onClose} show={ruleModal.isOpen} />}
            <CollectionCreate close={editModal.onClose} collection={collection} refetch={fetch} open={editModal.isOpen} />
        </>
    )
}

export default ControlsListCollection