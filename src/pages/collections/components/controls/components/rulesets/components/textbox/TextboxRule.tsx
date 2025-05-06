import React, { useContext } from 'react'
import ruleModelContext from '../../context'
import AppInput from 'components/redesign/input/AppInput'

function TextboxRule({ element, isRequired, ...props }) {
    const { errors, setFieldValue, values } = useContext(ruleModelContext)
    // TODO : error handling
    return (
        <AppInput
            inputProps={{
                isRequired: isRequired,
                name: element,
                onChange: (e) => setFieldValue(element, e.target.value),
                value: values[element] || "",
                placeholder: props.placeholder,
            }}
            description={props.description}
            label={props.label}
        />
    )
}

export default TextboxRule