import React, { useState } from 'react';
import AppSwitch from 'components/common/swich';
import { updateCollectionVisiblityService } from 'services/collection/services';
import useAppToast from 'hooks/toast/useToast';
import { Collection } from 'services/collection/interfaces';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

function VisibilitySwitch({ collection }: { collection: Collection }) {
    const { showToast } = useAppToast();
    const [isVisible, setIsVisible] = useState(collection?.published);
    const { t } = useLocaleResources("collections");

    const handleVisibleSwitch = async () => {
        setIsVisible((prev) => !prev);
        try {
            await updateCollectionVisiblityService({ collectionID: collection?._id, published: !isVisible });
        } catch (error) {
            showToast({ message: t("visibility.error"), type: "error" });
        }
    };

    return (
        <AppSwitch name={`visibility_${collection?._id}`} isChecked={isVisible} onChange={handleVisibleSwitch} />
    );
}

export default VisibilitySwitch;