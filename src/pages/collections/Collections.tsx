import { useDisclosure } from "@chakra-ui/react";
import useCollections from "functions/hooks/useCollections/useCollections";
import { useCheckPermission } from "lib/stores/app/appStore";
import React, { useMemo, useState } from "react";
import CollectionsModel from "./model";
import CollectionCreate from "./components/create/CollectionCreate";
import CollectionReorderModal from "./components/collection-reorder-modal/CollectionReorderModal";
import CollectionGrid from "./CollectionGrid";

function Collections() {
    const checkPermissionAndShowToast = useCheckPermission();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const collectionReorderModal = useDisclosure();
    const { isFetching, data, refetch } = useCollections();
    const [searchTerm, setSearchTerm] = useState("");

    const handleOpenCreateCollectionModal = () => {
        if (!checkPermissionAndShowToast("collection_management")) return;
        onOpen();
    };

    const rows = useMemo(() => {
        const collections = data?.data;
        return collections
            ? CollectionsModel.refactorData({
                data: collections,
                fetch,
                search: searchTerm,
            })
            : [];
    }, [searchTerm, data]);

    return (
        <>
            <CollectionGrid
                isFetching={isFetching}
                rows={rows}
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                onCreateCollection={handleOpenCreateCollectionModal}
                onReorderClick={collectionReorderModal.onOpen}
            />
            <CollectionCreate close={onClose} open={isOpen} />
            {collectionReorderModal.isOpen && (
                <CollectionReorderModal
                    isOpen={collectionReorderModal.isOpen}
                    close={() => {
                        collectionReorderModal.onClose();
                        refetch();
                    }}
                />
            )}
        </>
    );
}

export default Collections;
