import AppInput from 'components/shared/form/textbox/AppInput'
import ruleModelContext from 'modals/rule-modal/context'
import React, { useContext } from 'react'

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