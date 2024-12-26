import AppDatePicker from 'components/redesign/date-picker/AppDatePicker'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductReleaseDate() {
    const { values: { launchDate }, setFieldValue } = useProductForm()
    const [releaseDateSwitch, setReleaseDateSwitch] = useState(false)
    const [date, setDate] = useState("")

    return (
        <SwitchBox
            title='Release Date'
            description='Select a specific release date for this product.'
            isChecked={releaseDateSwitch}
            onToggle={(e) => setReleaseDateSwitch(e.target.checked)}
        >
            {releaseDateSwitch &&
                <AppDatePicker
                    onChange={(value) => setDate(value.toISOString())}
                    minDate={new Date()}
                    value={date ? new Date(date) : new Date()}
                    showTimeInput
                />
            }
        </SwitchBox>
    )
}

export default ProductReleaseDate