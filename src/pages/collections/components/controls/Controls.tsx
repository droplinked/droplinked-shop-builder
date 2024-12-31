import { Box, Divider, HStack, Spinner, useDisclosure } from '@chakra-ui/react';
import useAppStore, { useCheckPermission } from 'lib/stores/app/appStore';
import React, { useState } from 'react';
import CollectionCreate from '../create/CollectionCreate';
import ConfirmDeleteCollection from './components/delete/ConfirmDeleteCollection';
import RuleModal from './components/rulesets/RuleModal';
import TableMenu from 'components/redesign/table-menu/TableMenu';
import AppIcons from 'assest/icon/Appicons';
import { Link } from 'react-router-dom';
import { appDevelopment } from 'lib/utils/app/variable';
import { updateCollectionVisiblityService } from 'lib/apis/collection/services';
import useAppToast from 'functions/hooks/toast/useToast';
import { useMutation } from 'react-query';

function ControlsListCollection({ collection, fetch }) {
    const { showToast } = useAppToast();
    const checkPermissionAndShowToast = useCheckPermission();
    const deleteModal = useDisclosure();
    const ruleModal = useDisclosure();
    const editModal = useDisclosure();
    const [isPublished, setIsPublished] = useState<boolean>(collection.published);
    const { mutateAsync, isLoading } = useMutation(
        () => updateCollectionVisiblityService({
            collectionID: collection?._id,
            published: !isPublished
        }),
        {
            onSuccess: () => setIsPublished(!isPublished),
            onError: () => showToast({
                message: "You cannot change your collection status at this time. Please try again later",
                type: "error"
            })
        }
    );
    const { shop: { name } } = useAppStore();
    const redirectUrl = `https://${appDevelopment ? "dev." : ""}droplinked.io/${name}/collection/${collection._id}`;

    const handleOpenRulesetModal = () => {
        if (collection.ruleSetID || checkPermissionAndShowToast("rulesets")) {
            ruleModal.onOpen();
        }
    };

    const renderVisibilityIcon = () => (
        isPublished ? <AppIcons.Eye stroke='#2BCFA1' /> : <AppIcons.HidedIcon />
    );
    const handleCopy = () => {
        navigator.clipboard.writeText(collection._id)
        showToast({ message: "Collection ID copied successfully", type: "success" })
    }

    return (
        <HStack gap={"16px"} justifyContent={"end"}>
            {isLoading ? <Spinner size={"sm"} /> : <Box cursor={"pointer"} onClick={() => mutateAsync()}>
                {renderVisibilityIcon()}
            </Box>}
            <Box height={"40px"}>
                <Divider orientation='vertical' borderColor={"#292929"} />
            </Box>
            <Link style={{ cursor: "pointer" }} target='_blank' to={redirectUrl}>
                <AppIcons.Share />
            </Link>
            <TableMenu key={collection._id} items={[
                {
                    title: "Edit",
                    onClick: editModal.onOpen,
                    icon: <AppIcons.EditOutlined />
                },
                {
                    title: "Ruleset",
                    onClick: handleOpenRulesetModal,
                    icon: <AppIcons.RulesetsIcon />
                },
                {
                    title: "Copy Collection ID",
                    onClick: handleCopy,
                    icon: <AppIcons.Copy />
                },
                {
                    title: "Delete",
                    onClick: deleteModal.onOpen,
                    color: "#FF2244",
                    icon: <AppIcons.RedTrash />
                }
            ]} />
            <ConfirmDeleteCollection close={deleteModal.onClose} open={deleteModal.isOpen} collectionID={collection?._id} fetch={fetch} />
            {ruleModal.isOpen && <RuleModal collectionId={collection?._id} ruleId={collection?.ruleSetID?._id} close={ruleModal.onClose} show={ruleModal.isOpen} />}
            <CollectionCreate close={editModal.onClose} collection={collection} open={editModal.isOpen} />
        </HStack>
    );
}

export default ControlsListCollection;