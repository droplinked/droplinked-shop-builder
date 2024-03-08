import { Flex } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AppIcons from 'assest/icon/Appicons';
import AppImage from 'components/common/image/AppImage';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

function SortableProduct({ product }: { product: any }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: product.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex alignItems={"center"} gap={3}>
                    <AppImage
                        src={product.media.find(image => image.isMain === "true")?.thumbnail}
                        width={12}
                        height={12}
                        borderRadius={1}
                    />
                    <AppTypography fontSize={16} fontWeight={500} color={"#c2c2c2"}>{product.title}</AppTypography>
                </Flex>
                <AppIcons.Order />
            </Flex>
        </div>
    );
}

export default SortableProduct