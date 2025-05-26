import { Flex, Spinner } from '@chakra-ui/react';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import AppIcons from 'assets/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useAppToast from 'hooks/toast/useToast';
import { getAllCollectionsService, reorderCollectionsService } from 'services/collection/services';
import React, { useEffect, useState } from 'react';
import SortableCollection from './components/SortableCollection';

interface Props {
    isOpen: boolean;
    close: () => void;
}

function CollectionReorderModal({ isOpen, close }: Props) {
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { showToast } = useAppToast();
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const getCollectionPosition = (id) => collections?.findIndex(p => p._id === id);

    const handleDragEnd = async (e) => {
        const originalCollections = [...collections];
        try {
            const { active, over } = e;
            if (active.id === over.id) return;
            const originalPosition = getCollectionPosition(active.id);
            const newPosition = getCollectionPosition(over.id);
            setCollections(collections => arrayMove(collections, originalPosition, newPosition));
            await reorderCollectionsService({ collectionId: active.id, newPosition: newPosition + 1 });
        } catch (error) {
            showToast({ type: "error", message: "Something went wrong!" });
            setCollections(originalCollections);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchCollections = async () => {
            try {
                const collectionsData = await getAllCollectionsService(signal);
                setCollections(collectionsData?.data);
            } catch (error) {
                if (!signal.aborted) {
                    showToast({ type: "error", message: "Something went wrong!" });
                }
            }
        };

        setIsLoading(true);
        fetchCollections();
        setIsLoading(false);

        return () => controller.abort();
    }, []);


    return (
        <AppModal modalRootProps={{ isOpen, onClose: close, isCentered: false, size: "2xl" }} modalContentProps={{ background: "#141414", px: "0px", paddingInline: "0px", sx: { paddingInline: "0px", paddingBlock: "0px", paddingTop: "48px" } }}>
            <ModalHeaderData
                icon={<AppIcons.ReorderDesigned />}
                modalHeaderProps={{
                    px: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                    padding: "0px",
                    paddingBlock: "0px",
                    backgroundColor: '#141414'
                }}
                title='Visibility and Reorder Collections'
                description='Rearrange collections by dragging and dropping them to set their display order in your store. Top three collections are visible on your PLP page.'
            />
            <Flex direction={"column"} gap={9}>
                {isLoading ? (
                    <Flex alignItems="center" justifyContent="center" direction="column" my={10} gap={4}>
                        <Spinner size={"xl"} color='#2BCFA1' />
                    </Flex>
                ) : (
                    <DndContext
                        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext items={collections?.map((i) => i._id)} strategy={verticalListSortingStrategy}>
                            <Flex direction={"column"}>
                                {collections?.map((collection, index) => (
                                    <SortableCollection key={collection._id} index={index} collection={collection} />
                                ))}
                            </Flex>
                        </SortableContext>
                    </DndContext>
                )}
            </Flex>
        </AppModal>
    );
}

export default CollectionReorderModal;
