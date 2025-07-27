import Textarea from 'components/redesign/textarea/Textarea'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductTermsAndConditions() {
    const { t } = useLocaleResources('products');
    const [showMore, setShowMore] = useState(false)

    return (
        <SwitchBox
            title={t('ProductTermsAndConditions.title')}
            description={t('ProductTermsAndConditions.description')}
            switchProps={{
                isChecked: showMore,
                onChange: (e) => setShowMore(e.target.checked)
            }}
        >
            {showMore && (
                <Textarea
                    placeholder={t('ProductTermsAndConditions.placeholder')}
                    rows={8}
                />
            )}
        </SwitchBox>
    )
}

export default ProductTermsAndConditions