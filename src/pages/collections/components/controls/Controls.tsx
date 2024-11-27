import { Box, Divider, HStack, useDisclosure } from '@chakra-ui/react';
import useAppStore, { useCheckPermission } from 'lib/stores/app/appStore';
import React, { useState } from 'react';
import CollectionCreate from '../create/CollectionCreate';
import ConfirmDeleteCollection from './components/delete/ConfirmDeleteCollection';
import RuleModal from './components/rulesets/RuleModal';
import PopOverMenu from 'components/redesign/PopoverMenu/PopOverMenu';
import AppIcons from 'assest/icon/Appicons';
import { Link } from 'react-router-dom';
import { appDevelopment } from 'lib/utils/app/variable';
import { updateCollectionVisiblityService } from 'lib/apis/collection/services';
import useAppToast from 'functions/hooks/toast/useToast';

function ControlsListCollection({ collection, fetch }) {
    const { showToast } = useAppToast();
    const checkPermissionAndShowToast = useCheckPermission()
    const deleteModal = useDisclosure()
    const ruleModal = useDisclosure()
    const editModal = useDisclosure()
    const [isPublished, setIsPublished] = useState<boolean>(collection.published)
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

    const handleVisibleSwitch = async () => {
        try {
            await updateCollectionVisiblityService({
                collectionID: collection?._id,
                published: !isPublished
            });
            setIsPublished(!isPublished)
        } catch (error) {
            showToast({
                message: "You cannot change your collection status at this time. Please try again later",
                type: "error"
            });
        }
    };

    return (
        <HStack gap={"16px"} justifyContent={"end"}>
            <Box cursor={"pointer"} onClick={handleVisibleSwitch}>
                {isPublished ? (
                    <AppIcons.Eye stroke='#2BCFA1' />
                ) : (
                    <AppIcons.Eye stroke='#FF2244' />
                )}
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