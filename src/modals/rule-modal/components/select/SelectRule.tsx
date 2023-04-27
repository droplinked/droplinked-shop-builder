import AppSelectBox from 'components/shared/form/select/AppSelectBox'
import AppInput from 'components/shared/form/textbox/AppInput'
import ruleModelContext from 'modals/rule-modal/context'
import React, { useContext } from 'react'

function SelectRule({ element, items, ...props }) {
    const { errors, setFieldValue, values } = useContext(ruleModelContext)

    return (
        <AppSelectBox
            name={element}
            onChange={(e) => setFieldValue(element, e.target.value)}
            items={items}
            value={values[element]}
            error={errors[element]}
            isRequired
            {...props}
        />
    )
}

export default SelectRule