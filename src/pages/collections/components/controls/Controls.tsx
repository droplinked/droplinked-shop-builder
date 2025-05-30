import { Box, Divider, HStack, Spinner, useDisclosure } from '@chakra-ui/react';
import useAppStore, { useCheckPermission } from 'stores/app/appStore';
import React, { useState } from 'react';
import CollectionCreate from '../create/CollectionCreate';
import ConfirmDeleteCollection from './components/delete/ConfirmDeleteCollection';
import RuleModal from './components/rulesets/RuleModal';
import TableMenu from 'components/redesign/table-menu/TableMenu';
import AppIcons from 'assets/icon/Appicons';
import { Link } from 'react-router-dom';
import { appDevelopment } from 'utils/app/variable';
import { updateCollectionVisiblityService } from 'services/collection/services';
import useAppToast from 'hooks/toast/useToast';
import { useMutation } from 'react-query';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

function ControlsListCollection({ collection, fetch }) {
    const { showToast } = useAppToast();
    const { t } = useLocaleResources("collections");
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
                message: t("visibility.error"),
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
        isPublished ? <AppIcons.Eye stroke='#2BCFA1' /> : <AppIcons.HidedIcon stroke='#FF2244' />
    );
    const handleCopy = () => {
        navigator.clipboard.writeText(collection._id)
        showToast({ message: t("controls.collectionIdCopied"), type: "success" })
    }

    return (
        <HStack gap={"16px"} justifyContent={"end"}>
            {isLoading ? <Spinner size={"sm"} /> : <Box cursor={"pointer"} onClick={() => mutateAsync()}>
                {renderVisibilityIcon()}
            </Box>}
            <Box height={"40px"}>
                <Divider orientation='vertical' borderColor={"neutral.gray.800"} />
            </Box>
            <Link style={{ cursor: "pointer" }} target='_blank' to={redirectUrl}>
                <AppIcons.Share />
            </Link>
            <TableMenu key={collection._id} items={[
                {
                    title: t("controls.menu.edit"),
                    onClick: editModal.onOpen,
                    icon: <AppIcons.EditOutlined />
                },
                {
                    title: t("controls.menu.ruleset"),
                    onClick: handleOpenRulesetModal,
                    icon: <AppIcons.RulesetsIcon />
                },
                {
                    title: t("controls.menu.copyId"),
                    onClick: handleCopy,
                    icon: <AppIcons.Copy />
                },
                {
                    title: t("controls.menu.delete"),
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