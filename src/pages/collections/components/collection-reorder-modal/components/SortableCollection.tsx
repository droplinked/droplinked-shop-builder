import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Icons
import AppIcons from 'assets/icon/Appicons';

// Components
import VisibilitySwitch from './VisibilitySwitch';
import CollectionTitle from './CollectionTitle';
import { Collection } from 'lib/apis/collection/interfaces';

function SortableCollection({ collection, index }: { collection: Collection, index: number }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: collection._id,
        animateLayoutChanges: () => false
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: "100%",
        padding: "0px 48px",
        background: "#1c1c1c",
        height: "64px",
        display: "flex",
        borderTop: index !== 0 && "1px solid #292929"
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                <Flex alignItems={"center"} gap={"16px"} padding={"8px 0"}>
                    <VisibilitySwitch collection={collection} />
                    <CollectionTitle title={collection?.title} />
                </Flex>
                <Flex {...listeners}>
                    <AppIcons.VerticalMove />
                </Flex>
            </Flex>
        </div>
    );
}

export default SortableCollection;
