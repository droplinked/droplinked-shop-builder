import React, { useEffect, useState } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Components
import AppTypography from 'components/common/typography/AppTypography';
import SortableCollection from './sortable-collection/SortableCollection';

// Toast
import useAppToast from 'functions/hooks/toast/useToast';

// APIs
import { getAllCollectionsService, reorderCollectionsService } from 'lib/apis/collection/services';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';

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
        <AppModal modalRootProps={{ isOpen, onClose: close, isCentered: false }} >
            <Flex direction={"column"} gap={9}>
                <ModalHeaderData>
                    <Flex direction={"column"} gap={6}>
                        <AppTypography fontSize={16} fontWeight={500} color={"#fff"}>Visibility and Reorder Collections</AppTypography>
                        <Flex direction={"column"} gap={3}>
                            <AppTypography fontSize={14} color={"#fff"}>
                                Rearrange collections by dragging and dropping them to set their display order in your store. Top three collections are visible on your PLP page.
                            </AppTypography>
                        </Flex>
                    </Flex>
                </ModalHeaderData>
                {isLoading ? (
                    <Flex alignItems="center" justifyContent="center" direction="column" gap={4}>
                        <Spinner size="lg" color="#FFF" />
                        <AppTypography color={"#FFF"}>Loading collections...</AppTypography>
                    </Flex>
                ) : (
                    <DndContext
                        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext items={collections?.map((i) => i._id)} strategy={verticalListSortingStrategy}>
                            <Flex direction={"column"} gap={"24px"}>
                                {collections?.map((collection) => (
                                    <SortableCollection key={collection._id} collection={collection} />
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
