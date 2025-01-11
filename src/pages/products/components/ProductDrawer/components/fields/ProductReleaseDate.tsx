import AppDatePicker from 'components/redesign/date-picker/AppDatePicker'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useEffect, useState } from 'react'
import SwitchBox from '../common/SwitchBox'
import MessageBox from 'components/redesign/message-box/MessageBox'

function ProductReleaseDate() {
    const { values: { launchDate }, setFieldValue, errors } = useProductForm()
    const [releaseDateSwitch, setReleaseDateSwitch] = useState(launchDate ? true : false)

    const handleToggleSwitch = (e) => {
        setReleaseDateSwitch(e.target.checked)
        setFieldValue("launchDate", e.target.checked ? new Date().toISOString() : null)
    }

    return (
        <SwitchBox
            title='Release Date'
            description='Select a specific release date for this product.'
            isChecked={releaseDateSwitch}
            onToggle={handleToggleSwitch}
        >
            {releaseDateSwitch &&
                <AppDatePicker
                    onChange={(value) => setFieldValue("launchDate", value.toISOString())}
                    minDate={new Date()}
                    value={launchDate ? new Date(launchDate) : new Date()}
                    showTimeInput
                />
            }
            {(errors.launchDate && releaseDateSwitch) &&
                <MessageBox
                    title={errors.launchDate}
                    theme='warning'
                />
            }
        </SwitchBox>
    )
}

export default ProductReleaseDate