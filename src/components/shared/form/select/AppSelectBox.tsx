import { SelectProps, Select, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/shared/skeleton/AppSkeleton'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React from 'react'
import ErrorLabel from '../errorLabel/errorLabel'
import FieldLabel from '../fieldLabel/FieldLabel'
import FormModel, { IAppForm } from '../FormModel'

interface IAppSelectBoxItems {
    value: string | number | null
    caption: string
    [prop: string]: any
}

type combine = IAppForm & SelectProps

interface Iprops extends combine {
    items: Array<IAppSelectBoxItems>
    optionDefault?: string
}

function AppSelectBox(props: Iprops) {
    const { error, name, label, items, loading, optionDefault } = props

    return (
        <VStack align={"stretch"} width="100%" spacing={1}>
            <FieldLabel loading={loading} isRequired={props.isRequired} label={label} />
            <AppSkeleton isLoaded={loading}>
                <Select
                    style={{ boxShadow: "unset" }}
                    isInvalid={error ? true : false}
                    placeholder={capitalizeFirstLetter(name)}
                    {...FormModel.styleProps()}
                    size="lg"
                    iconSize={"30px"}
                    padding={0}
                    {...props}
                >
                    {optionDefault && <option value={""} disabled selected>{optionDefault}</option>}
                    {items.map((e, key) => (
                        <option key={key} {...e}>{e.caption}</option>
                    ))}
                </Select>
            </AppSkeleton>
            <ErrorLabel message={error} />
        </VStack>
    )
}

export default AppSelectBox