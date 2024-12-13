import Input from 'components/redesign/input/Input'
import Textarea from 'components/redesign/textarea/Textarea'
import React, { useState } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductDeliveryMessage() {
    const [showMore, setShowMore] = useState(false)

    return (
        <SwitchBox
            title='Delivery Message'
            description='Provide customers with important delivery details at checkout, such as estimated shipping times or special instructions.'
            isChecked={showMore}
            onToggle={(e) => setShowMore(e.target.checked)}
        >
            {showMore && (
                <>
                    <Textarea
                        placeholder='e.g., Expected delivery within 5–7 business days, or include specific delivery instructions.'
                        rows={8}
                    />
                    <Input
                        inputGroupProps={{ mt: 4 }}
                        inputProps={{ placeholder: "e.g., www.sample.com", fontSize: 16 }}
                    />
                </>
            )}

        </SwitchBox>
    )
}

export default ProductDeliveryMessage