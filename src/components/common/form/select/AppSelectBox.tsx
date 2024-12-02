import { SelectProps, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import Select from 'components/redesign/select/AppSelect'
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
    const { error, items, loading } = props

    return (
        <VStack align="stretch" width="100%" spacing={1}>
            <AppSkeleton isLoaded={loading}>
                <Select
                    // style={{ boxShadow: "unset" }}
                    // isInvalid={error ? true : false}
                    // {...FormModel.styleProps()}
                    // size="lg"
                    // iconSize={"30px"}
                    // padding={0}
                    items={items}
                    labelAccessor='caption'
                    valueAccessor='value'
                    {...props}
                    selectProps={{ onChange: props.onChange }}
                />
            </AppSkeleton>
            <ErrorLabel message={error} />
        </VStack>
    )
}

export default AppSelectBox