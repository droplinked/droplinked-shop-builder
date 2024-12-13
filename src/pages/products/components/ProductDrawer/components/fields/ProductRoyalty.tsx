import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import React, { useState } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductRoyalty() {
    const [showInput, setShowInput] = useState(false)

    const preventInvalidKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const invalidKeys = ['+', '-', 'e']
        if (invalidKeys.includes(e.key)) e.preventDefault()
    }

    return (
        <SwitchBox
            title='Royalty'
            description='Activate royalties on this product to receive a percentage on each resale.'
            isChecked={showInput}
            onToggle={(e) => setShowInput(e.target.checked)}
            {...(showInput && {
                rightContent: (
                    <Input
                        inputGroupProps={{ width: "88px" }}
                        inputProps={{
                            type: "number",
                            min: 1,
                            max: 99,
                            onKeyDown: preventInvalidKeys,
                            placeholder: "100",
                            value: 1,
                            onChange: (e) => console.log(e.target.value)
                        }}
                        rightElement={<AppIcons.GrayPercent />}
                    />
                )
            })}
        />
    )
}

export default ProductRoyalty