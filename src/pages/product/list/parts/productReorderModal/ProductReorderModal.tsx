import { Flex } from '@chakra-ui/react';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import AppIcons from 'assest/icon/Appicons';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import React, { useState } from 'react';
import SortableProduct from './parts/sortableProduct/SortableProduct';

interface Props {
    isOpen: boolean;
    close: () => void;
    products: any
}

function ProductReorderModal({ isOpen, close }: Props) {
    const [products, setProducts] = useState([
        { id: 1, title: "Hello 1", media: [{ id: 1, isMain: "true", thumbnail: "" }] },
        { id: 2, title: "Hello 2", media: [{ id: 1, isMain: "true", thumbnail: "" }] },
        { id: 3, title: "Hello 3", media: [{ id: 1, isMain: "true", thumbnail: "" }] },
    ])

    const getTaskPos = (id) => products.findIndex(p => p.id === id)

    const handleDragEnd = (e) => {
        const { active, over } = e
        if (active.id === over.id) return

        setProducts(products => {
            const originalPos = getTaskPos(active.id)
            const newPos = getTaskPos(over.id)
            return arrayMove(products, originalPos, newPos)
        })
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    return (
        <AppModal open={isOpen} close={close} size="3xl" contentProps={{ paddingX: 3, paddingY: 6, overflow: "hidden" }}>
            <Flex direction={"column"} gap={9}>
                <Flex direction={"column"} gap={6}>
                    <AppTypography fontSize={16} fontWeight={500} color={"#fff"}>Reorder Products</AppTypography>
                    <Flex direction={"column"} gap={3}>
                        <AppTypography fontSize={14} color={"#fff"}>
                            Rearrange products by dragging and dropping them to set their display order in your store. You can also select and move multiple items at once.
                        </AppTypography>
                        <Flex alignItems={"center"} gap={2}>
                            <AppIcons.InfoIcon />
                            <AppTypography color={"#c2c2c2"}>This sets the default view, but users can sort as they wish.</AppTypography>
                        </Flex>
                    </Flex>
                </Flex>
                <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                    <SortableContext items={products} strategy={verticalListSortingStrategy}>
                        <Flex direction={"column"} gap={6}>
                            {products.map((product) => <SortableProduct product={product} />)}
                        </Flex>
                    </SortableContext>
                </DndContext>
            </Flex>
        </AppModal >
    )
}

export default ProductReorderModal