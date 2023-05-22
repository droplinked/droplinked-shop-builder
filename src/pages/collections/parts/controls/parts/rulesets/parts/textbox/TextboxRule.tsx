import AppInput from 'common/form/textbox/AppInput'
import React, { useContext } from 'react'
import ruleModelContext from '../../context'

function TextboxRule({ element, ...props }) {
    const { errors, setFieldValue, values, loading } = useContext(ruleModelContext)
    
    return (
        <AppInput
            name={element}
            onChange={(e) => setFieldValue(element, e.target.value)}
            value={values[element] || ""}
            error={errors[element]}
            {...props}
            loading={loading}
            isRequired
        />
    )
}

export default TextboxRule