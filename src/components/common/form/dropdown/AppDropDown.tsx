import { VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'
import Select from 'react-select'
import ErrorLabel from '../errorLabel/errorLabel'
import FieldLabel, { IFieldLabel } from '../fieldLabel/FieldLabel'
import { IAppForm } from '../FormModel'
import DropDownModel from './DropDownModel'

type merge = IAppForm & IFieldLabel

interface Ioptions {
    value: string | number
    label: string | number
}

interface Iprops extends merge {
    options: Array<Ioptions>
    onChange: any
    value: Ioptions
}

function AppDropDown({ options, isRequired, label, onChange, error, value, loading }: Iprops) {

    return (
        <VStack align={"stretch"} spacing="12px">
            {label && <FieldLabel loading={loading} label={label} isRequired={isRequired} />}
            <AppSkeleton isLoaded={loading}>
                <Select
                    options={options}
                    value={value}
                    onChange={onChange}
                    styles={DropDownModel.style(error)}
                />
            </AppSkeleton>
            <ErrorLabel message={error} />
        </VStack>
    )
}

export default AppDropDown