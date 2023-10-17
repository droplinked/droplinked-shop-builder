import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import React from 'react'

interface IProps {
    caption: string
    isRequired?: boolean
}

function OptionsCaption({ caption, isRequired = false }: IProps) {
    return <FieldLabel label={caption} isRequired={isRequired} textProps={{ size: "14px", color: "#C2C2C2" }} />
}

export default OptionsCaption