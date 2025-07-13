import Textarea from 'components/redesign/textarea/Textarea'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductTermsAndConditions() {
    const { t } = useLocaleResources('products');
    const [showMore, setShowMore] = useState(false)

    return (
        <SwitchBox
            title={t('fields.termsAndConditions.title')}
            description={t('fields.termsAndConditions.description')}
            switchProps={{
                isChecked: showMore,
                onChange: (e) => setShowMore(e.target.checked)
            }}
        >
            {showMore && (
                <Textarea
                    placeholder={t('fields.termsAndConditions.placeholder')}
                    rows={8}
                />
            )}
        </SwitchBox>
    )
}

export default ProductTermsAndConditions