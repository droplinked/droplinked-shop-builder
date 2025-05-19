import { useDisclosure } from "@chakra-ui/react";
import useCollections from "hooks/useCollections/useCollections";
import { useCheckPermission } from "stores/app/appStore";
import React, { useMemo, useState } from "react";
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

    const filteredData = useMemo(() => {
        const collections = data?.data || [];
        return searchTerm
            ? collections.filter(collection => collection.title.toLowerCase().includes(searchTerm.toLowerCase()))
            : collections;
    }, [searchTerm, data]);

    return (
        <>
            <CollectionGrid
                isFetching={isFetching}
                rows={filteredData}
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                onCreateCollection={handleOpenCreateCollectionModal}
                onReorderClick={collectionReorderModal.onOpen}
                refetch={() => refetch()}
            />
            <CollectionCreate close={onClose} open={isOpen} />
            {collectionReorderModal.isOpen &&
                <CollectionReorderModal
                    isOpen={collectionReorderModal.isOpen}
                    close={() => {
                        collectionReorderModal.onClose();
                        refetch();
                    }}
                />
            }
        </>
    );
}

export default Collections;
