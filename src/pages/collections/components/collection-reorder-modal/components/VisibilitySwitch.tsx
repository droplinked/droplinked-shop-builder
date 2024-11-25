
import React, { useState } from 'react';
import AppSwitch from 'components/common/swich';
import { updateCollectionVisiblityService } from 'lib/apis/collection/services';
import useAppToast from 'functions/hooks/toast/useToast';
import { Collection } from 'lib/apis/collection/interfaces';

function VisibilitySwitch({ collection }: { collection: Collection }) {
    const { showToast } = useAppToast();
    const [isVisible, setIsVisible] = useState(collection?.published);

    const handleVisibleSwitch = async () => {
        setIsVisible((prev) => !prev);
        try {
            await updateCollectionVisiblityService({ collectionID: collection?._id, published: !isVisible });
        } catch (error) {
            showToast({ message: "You cannot change your collection status at this time. Please try again later", type: "error" });
        }
    };

    return (
        <AppSwitch name={`visibility_${collection?._id}`} isChecked={isVisible} onChange={handleVisibleSwitch} />
    );
}

export default VisibilitySwitch;