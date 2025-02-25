import { Flex } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AppIcons from 'assets/icon/Appicons';
import AppImage from 'components/common/image/AppImage';
import AppTypography from 'components/common/typography/AppTypography';
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
            paddingBlock={5}
            paddingInline={12}
            transform={CSS.Transform.toString(transform)}
            transition={transition}
            {...attributes}
            {...listeners}
            {...(!isLastItem && { borderBottom: "1px solid #3C3C3C" })}
        >
            <AppImage
                src={product.media.find(image => image.isMain === "true")?.thumbnail}
                width={12}
                height={12}
                borderRadius={8}
            />
            <AppTypography flex={1} fontSize={16} color="#FFF">{product.title}</AppTypography>
            <AppIcons.VerticalMove />
        </Flex>
    )
}

export default SortableProduct