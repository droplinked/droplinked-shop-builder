import { SelectProps, Select, VStack } from '@chakra-ui/react'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React from 'react'
import ErrorLabel from '../errorLabel/errorLabel'
import FieldLabel from '../fieldLabel/FieldLabel'
import FormModel, { IAppForm } from '../FormModel'

interface IAppSelectBoxItems {
    value: string | number | null
    caption: string
}

type combine = IAppForm & SelectProps

interface Iprops extends combine {
    items: Array<IAppSelectBoxItems>
}

function AppSelectBox(props: Iprops) {
    const { error, name, label, items } = props

    return (
        <VStack align={"stretch"} width="100%" spacing={1}>
            <FieldLabel isRequired={props.isRequired} label={label} />
            <Select
                style={{ boxShadow: "unset" }}
                isInvalid={error ? true : false}
                placeholder={capitalizeFirstLetter(name)}
                {...FormModel.styleProps()}
                padding={0}
                {...props}
            >
                {items.map((e, key) => (
                    <option key={key} value={e.value}>{e.caption}</option>
                ))}
            </Select>
            <ErrorLabel message={error} />
        </VStack>
    )
}

export default AppSelectBox