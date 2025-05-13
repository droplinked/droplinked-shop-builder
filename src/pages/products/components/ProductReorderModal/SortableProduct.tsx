import { Flex, Text } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Verticalmove2Lg } from 'assets/icons/Navigation/VerticalMove2/Verticalmove2Lg';
import AppImage from 'components/common/image/AppImage';
import React from 'react';

interface Props {
    product: any
    isLastItem: boolean
}

function SortableProduct({ product, isLastItem }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: product._id,
        animateLayoutChanges: () => false
    })

    return (
        <Flex
            ref={setNodeRef}
            alignItems="center"
            gap={6}
            padding="20px 48px"
            transform={CSS.Transform.toString(transform)}
            transition={transition}
            {...attributes}
            {...listeners}
            {...(!isLastItem && { borderBottom: "1px solid", borderColor: "neutral.gray.700" })}
        >
            <AppImage
                src={product.media.find(image => image.isMain === "true")?.thumbnail}
                width={12}
                height={12}
                borderRadius={8}
            />
            <Text flex={1} color="text.white">{product.title}</Text>
            <Verticalmove2Lg color='white' />
        </Flex>
    )
}

export default SortableProduct