import { useDisclosure } from '@chakra-ui/react';
import { useCheckPermission } from 'lib/stores/app/appStore';
import React from 'react';
import CollectionCreate from '../create/CollectionCreate';
import ConfirmDeleteCollection from './parts/delete/ConfirmDeleteCollection';
import RuleModal from './parts/rulesets/RuleModal';
import PopOverMenu from 'components/redesign/PopoverMenu/PopOverMenu';
import AppIcons from 'assest/icon/Appicons';

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
                    onClick: editModal.onOpen,
                    icon: <AppIcons.Edit />
                },
                {
                    caption: "Ruleset",
                    onClick: handleOpenRulesetModal,
                    icon: <AppIcons.RulesetsIcon />
                },
                {
                    caption: "Delete",
                    onClick: deleteModal.onOpen,
                    color: "#FF2244",
                    icon: <AppIcons.TrashRed />
                }
            ]} />
            <ConfirmDeleteCollection close={deleteModal.onClose} open={deleteModal.isOpen} collectionID={collection?._id} fetch={fetch} />
            {ruleModal.isOpen && <RuleModal collectionId={collection?._id} ruleId={collection?.ruleSetID?._id} close={ruleModal.onClose} show={ruleModal.isOpen} />}
            <CollectionCreate close={editModal.onClose} collection={collection} open={editModal.isOpen} />
        </>
    )
}

export default ControlsListCollection