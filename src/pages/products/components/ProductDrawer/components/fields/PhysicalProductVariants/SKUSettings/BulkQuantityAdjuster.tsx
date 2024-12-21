import Input from 'components/redesign/input/Input'
import React, { useState } from 'react'
import SwitchBox from '../../../common/SwitchBox'
import InfinityToggleButton from '../SKUTable/InfinityToggleButton'

function BulkQuantityAdjuster() {
    const [fixedQuantity, setFixedQuantity] = useState(false)

    return (
        <SwitchBox
            title='Fixed Quantity'
            description='Apply a fixed quantity to all variants, overriding individual variant quantities.'
            isChecked={fixedQuantity}
            onToggle={() => setFixedQuantity(prev => !prev)}
            rightContent={fixedQuantity && (
                <Input
                    inputGroupProps={{ width: "104px" }}
                    inputContainerProps={{ padding: '8px', pl: 4 }}
                    inputProps={{

                    }}
                    rightElement={(
                        <InfinityToggleButton
                            isActive={false}
                            onToggle={() => { }}
                        />
                    )}
                />
            )}
        />
    )
}

export default BulkQuantityAdjuster