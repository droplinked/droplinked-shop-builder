import { SelectProps, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppSelect from 'components/redesign/select/AppSelect'
import React from 'react'
import ErrorLabel from '../errorLabel/errorLabel'
import { IAppForm } from '../FormModel'

interface IAppSelectBoxItems {
    value: any
    caption: string
}

interface Iprops extends Omit<IAppForm, "name">, SelectProps {
    items: Array<IAppSelectBoxItems>
}

function AppSelectBox(props: Iprops) {
    const { error, items, loading, value } = props

    return (
        <VStack align="stretch" width="100%" spacing={1}>
            <AppSkeleton isLoaded={loading}>
                <AppSelect
                    items={items}
                    labelAccessor='caption'
                    valueAccessor='value'
                    {...props}
                    selectProps={{ onChange: props.onChange, value }}
                />
            </AppSkeleton>
            <ErrorLabel message={error} />
        </VStack>
    )
}

export default AppSelectBox