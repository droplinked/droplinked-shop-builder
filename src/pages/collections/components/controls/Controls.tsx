import { Box, Divider, HStack, Spinner, useDisclosure } from '@chakra-ui/react';
import TableMenu from 'components/redesign/table-menu/TableMenu';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { updateCollectionVisiblityService } from 'services/collection/services';
import useAppStore, { useCheckPermission } from 'stores/app/appStore';
import { appDevelopment } from 'utils/app/variable';
import CollectionCreate from '../create/CollectionCreate';
import ConfirmDeleteCollection from './components/delete/ConfirmDeleteCollection';
import RuleModal from './components/rulesets/RuleModal';
import { ShowLg } from 'assets/icons/Action/Show/ShowLg'
import { HideLg } from 'assets/icons/Action/Hide/HideLg'
import { ShareLg } from 'assets/icons/Action/Share/ShareLg'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { RulesetMd } from 'assets/icons/System/Ruleset/RulesetMd'
import { CopyMd } from 'assets/icons/Action/Copy/CopyMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'

function ControlsListCollection({ collection, fetch }) {
    const [isPublished, setIsPublished] = useState<boolean>(collection.published);
    const deleteModal = useDisclosure();
    const ruleModal = useDisclosure();
    const editModal = useDisclosure();
    const { showToast } = useAppToast();
    const { shop: { name } } = useAppStore();
    const checkPermissionAndShowToast = useCheckPermission();
    const { t } = useLocaleResources("collections");
    
    const { mutateAsync, isLoading } = useMutation(
        () => updateCollectionVisiblityService({
                collectionID: collection?._id,
            published: !isPublished
            }),
        {
            onSuccess: () => setIsPublished(prev => !prev),
            onError: () => showToast({
                message: t("visibility.error"),
                type: "error"
            })
        }
    );

    const redirectUrl = `https://${appDevelopment ? "dev." : ""}droplinked.io/${name}/collection/${collection._id}`;

    const handleOpenRulesetModal = () => {
        if (collection.ruleSetID || checkPermissionAndShowToast("rulesets")) {
            ruleModal.onOpen();
        }
    };

    const renderVisibilityIcon = () => (
        isPublished ? <ShowLg color='#2BCFA1' /> : <HideLg color='#FF2244' />
    );
    const handleCopy = () => {
        navigator.clipboard.writeText(collection._id)
        showToast({ message: t("ControlsListCollection.collectionIdCopied"), type: "success" })
    }

    return (
        <HStack gap={"16px"} justifyContent={"end"}>
            {isLoading ? <Spinner size={"sm"} /> : <Box cursor={"pointer"} onClick={() => mutateAsync()}>
                {renderVisibilityIcon()}
            </Box>}
            <Box height={"40px"}>
                <Divider orientation='vertical' borderColor={"neutral.gray.800"} />
            </Box>
            <Link style={{ cursor: "pointer" }} target='_blank' rel="noopener noreferrer" to={redirectUrl}>
                <ShareLg />
            </Link>
            <TableMenu key={collection._id} items={[
                {
                    title: t("common:edit"),
                    onClick: editModal.onOpen,
                    icon: <EditMd />
                },
                {
                    title: t("ControlsListCollection.menu.ruleset"),
                    onClick: handleOpenRulesetModal,
                    icon: <RulesetMd />
                },
                {
                    title: t("ControlsListCollection.menu.copyId"),
                    onClick: handleCopy,
                    icon: <CopyMd />
                },
                {
                    title: t("common:delete"),
                    onClick: deleteModal.onOpen,
                    color: "#FF2244",
                    icon: <TrashMd color='#FF2244' />
                }
            ]} />
            <ConfirmDeleteCollection close={deleteModal.onClose} open={deleteModal.isOpen} collectionID={collection?._id} fetch={fetch} />
            {ruleModal.isOpen && <RuleModal collectionId={collection?._id} ruleId={collection?.ruleSetID?._id} close={ruleModal.onClose} show={ruleModal.isOpen} />}
            <CollectionCreate close={editModal.onClose} collection={collection} open={editModal.isOpen} />
        </HStack>
    );
}

export default ControlsListCollection;