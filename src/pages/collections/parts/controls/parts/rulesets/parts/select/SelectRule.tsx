import AppSelectBox from 'components/common/form/select/AppSelectBox'
import React, { useContext } from 'react'
import ruleModelContext from '../../context'

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