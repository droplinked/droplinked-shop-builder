import { Flex } from '@chakra-ui/react'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import useAppToast from 'hooks/toast/useToast'
import { reorderProductsService } from 'services/product/productServices'
import React, { Dispatch, SetStateAction } from 'react'
import SortableProduct from './SortableProduct'

interface Props {
    products: any[]
    setProducts: Dispatch<SetStateAction<any[]>>
}

function ProductList({ products, setProducts }: Props) {
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
        }
        catch (error) {
            showToast({ type: "error", message: "Something went wrong!" })
            setProducts(originalProducts)
        }
    }

    return (
        <DndContext
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={products.map((i) => i._id)}
                strategy={verticalListSortingStrategy}
            >
                <Flex direction="column">
                    {products.map((product, index) =>
                        <SortableProduct key={index} product={product} isLastItem={index === products.length - 1} />
                    )}
                </Flex>
            </SortableContext>
        </DndContext>
    )
}

export default ProductList