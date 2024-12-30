import Textarea from 'components/redesign/textarea/Textarea'
import React, { useState } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductTermsAndConditions() {
    const [showMore, setShowMore] = useState(false)

    return (
        <SwitchBox
            title='Custom Term of Service'
            description='Display custom terms specific to this product, such as return policies or disclaimers, during checkout.'
            isChecked={showMore}
            onToggle={(e) => setShowMore(e.target.checked)}
        >
            {showMore && (
                <Textarea
                    placeholder='e.g., This product is non-refundable after purchase or legal terms applicable to this product.'
                    rows={8}
                />
            )}

        </SwitchBox>
    )
}

export default ProductTermsAndConditions