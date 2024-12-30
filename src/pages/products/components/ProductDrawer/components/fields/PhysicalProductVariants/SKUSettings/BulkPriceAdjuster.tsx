import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import React, { useState } from 'react'
import SwitchBox from '../../../common/SwitchBox'

function BulkPriceAdjuster() {
    const [fixedPrice, setFixedPrice] = useState(false)

    return (
        <SwitchBox
            title='Fixed Quantity'
            description='Apply a fixed quantity to all variants, overriding individual variant quantities.'
            isChecked={fixedPrice}
            onToggle={() => setFixedPrice(prev => !prev)}
            rightContent={fixedPrice && (
                <Input
                    inputGroupProps={{ width: "104px" }}
                    inputProps={{

                    }}
                    leftElement={<AppIcons.GrayDollar />}
                />
            )}
        />
    )
}

export default BulkPriceAdjuster