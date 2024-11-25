import { Box, Divider, HStack, useDisclosure } from '@chakra-ui/react';
import useAppStore, { useCheckPermission } from 'lib/stores/app/appStore';
import React from 'react';
import CollectionCreate from '../create/CollectionCreate';
import ConfirmDeleteCollection from './components/delete/ConfirmDeleteCollection';
import RuleModal from './components/rulesets/RuleModal';
import PopOverMenu from 'components/redesign/PopoverMenu/PopOverMenu';
import AppIcons from 'assest/icon/Appicons';
import { Link } from 'react-router-dom';
import { appDevelopment } from 'lib/utils/app/variable';

function ControlsListCollection({ collection, fetch }) {
    const checkPermissionAndShowToast = useCheckPermission()
    const deleteModal = useDisclosure()
    const ruleModal = useDisclosure()
    const editModal = useDisclosure()
    const { shop: { name } } = useAppStore();
    const redirectUrl = `https://${appDevelopment ? "dev." : ""}droplinked.io/${name}/collection/${collection._id}`
    const handleOpenRulesetModal = () => {
        if (collection.ruleSetID) {
            ruleModal.onOpen()
            return
        }
        if (!checkPermissionAndShowToast("rulesets")) return
        ruleModal.onOpen()
    }

    return (
        <HStack gap={"16px"}>
            <Box cursor={"pointer"} onClick={() => editModal.onOpen()}>
                <AppIcons.Eye stroke='#2BCFA1' />
            </Box>
            <Box height={"40px"}>
                <Divider orientation='vertical' borderColor={"#292929"} />
            </Box>
            <Link style={{ cursor: "pointer" }} target='_blank' to={redirectUrl}>
                <AppIcons.Share />
            </Link>
            <PopOverMenu key={collection._id} items={[
                {
                    caption: "Edit",
                    onClick: editModal.onOpen,
                    icon: <AppIcons.EditOutlined />
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
        </HStack>
    )
}

export default ControlsListCollection