import React, { useContext } from 'react'
import ruleModelContext from '../../context'
import Input from 'components/redesign/input/Input'

function TextboxRule({ element, isRequired, ...props }) {
    const { errors, setFieldValue, values } = useContext(ruleModelContext)
    return (
        <Input
            inputProps={{
                isRequired: isRequired,
                name: element,
                onChange: (e) => setFieldValue(element, e.target.value),
                value: values[element] || "",
                placeholder: props.placeholder,
            }}
            description={props.description}
            label={props.label}
            error={errors[element]}
        />
    )
}

export default TextboxRule