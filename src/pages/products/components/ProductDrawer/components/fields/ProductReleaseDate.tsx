import AppDatePicker from 'components/redesign/date-picker/AppDatePicker'
import MessageBox from 'components/redesign/message-box/MessageBox'
import useProductForm from 'pages/products/hooks/useProductForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductReleaseDate() {
    const { t } = useLocaleResources('products');
    const { values: { launchDate }, setFieldValue, errors } = useProductForm()
    const [releaseDateSwitch, setReleaseDateSwitch] = useState(launchDate ? true : false)

    const handleToggleSwitch = (checked: boolean) => {
        setReleaseDateSwitch(checked)
        setFieldValue("launchDate", checked ? new Date().toISOString() : null)
    }

    return (
        <SwitchBox
            title={t('ProductReleaseDate.title')}
            description={t('ProductReleaseDate.description')}
            switchProps={{
                isChecked: releaseDateSwitch,
                onChange: (e) => handleToggleSwitch(e.target.checked)
            }}
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