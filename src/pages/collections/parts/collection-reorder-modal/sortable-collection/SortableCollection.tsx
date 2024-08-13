import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Icons
import AppIcons from 'assest/icon/Appicons';

// Components
import AppSwitch from 'components/common/swich';
import AppTypography from 'components/common/typography/AppTypography';

// APIs
import { updateCollectionVisiblityService } from 'lib/apis/collection/services';
import useAppToast from 'functions/hooks/toast/useToast';

function SortableCollection({ collection }: { collection: any }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: collection._id,
        animateLayoutChanges: () => false
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const { showToast } = useAppToast()
    const [isVisible, setIsVisible] = useState(collection?.published);

    const handleVisibleSwitch = async () => {
        setIsVisible((prev) => !prev);
        try {
            await updateCollectionVisiblityService({ collectionID: collection?._id, published: !isVisible });
        } catch (error) {
            showToast({message: "You cannot change your collection status at this time. Please try again later", type: "error"})         
        }
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex alignItems={"center"} gap={"16px"} padding={"8px 0"}>
                    <AppSwitch name={`visibility_${collection?._id}`} isChecked={isVisible} onChange={handleVisibleSwitch} />
                    <AppTypography fontSize={16} fontWeight={500} color={"#c2c2c2"}>{collection?.title}</AppTypography>
                </Flex>
                <Flex {...listeners}>
                    <AppIcons.Order />
                </Flex>
            </Flex>
        </div>
    );
}

export default SortableCollection;
