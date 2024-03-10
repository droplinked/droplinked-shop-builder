import { Flex } from '@chakra-ui/react';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import AppIcons from 'assest/icon/Appicons';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import useAppToast from 'functions/hooks/toast/useToast';
import { getAllProductsService, reorderProductsService } from 'lib/apis/product/productServices';
import React, { useEffect, useState } from 'react';
import Loading from './parts/loading/Loading';
import SortableProduct from './parts/sortableProduct/SortableProduct';

interface Props {
    isOpen: boolean;
    close: () => void;
}

function ProductReorderModal({ isOpen, close }: Props) {
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(false)
    const { showToast } = useAppToast()
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )
    const getProductPosition = (id) => products.findIndex(p => p._id === id)

    const handleDragEnd = async (e) => {
        const originalProducts = [...products]
        try {
            const { active, over } = e
            if (active.id == over.id) return
            const originalPosition = getProductPosition(active.id)
            const newPosition = getProductPosition(over.id)
            setProducts(products => arrayMove(products, originalPosition, newPosition))
            reorderProductsService({ productId: active.id, newPosition: newPosition + 1 })
        } catch (error) {
            showToast({ type: "error", message: "Something went wrong!" })
            setProducts(originalProducts)
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        (async () => {
            try {
                setLoading(true)
                const products = await getAllProductsService(signal)
                setProducts(products.data.data)
            }
            catch {
                if (signal.aborted) return
                showToast({ type: "error", message: "Something went wrong!" })
            }
            finally {
                setLoading(false)
            }
        })()

        return () => controller.abort()
    }, []);

    return (
        <AppModal open={isOpen} close={close} size="3xl" isCentered={false} contentProps={{ paddingX: 3, paddingY: 6, overflow: "hidden" }}>
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
                {
                    isLoading ? <Loading /> :
                        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                            <SortableContext items={products.map((i) => i._id)} strategy={verticalListSortingStrategy}>
                                <Flex direction={"column"} gap={6}>
                                    {products.map((product, index) => <SortableProduct key={index} product={product} />)}
                                </Flex>
                            </SortableContext>
                        </DndContext>
                }
            </Flex>
        </AppModal >
    )
}

export default ProductReorderModal