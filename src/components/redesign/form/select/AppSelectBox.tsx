import { SelectProps, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import Select from 'components/redesign/select/AppSelect'
import React from 'react'
import ErrorLabel from '../errorLabel/errorLabel'
import FieldLabel from '../fieldLabel/FieldLabel'
import FormModel, { IAppForm } from '../FormModel'

interface IAppSelectBoxItems {
    value: string | number | null
    caption: string
    [prop: string]: any;
}

type combine = IAppForm & SelectProps

interface Iprops extends combine {
    items: Array<IAppSelectBoxItems>
}

function AppSelectBox(props: Iprops) {
    const { error, label, items, loading, value } = props
    return (
        <VStack align={"stretch"} width="100%" spacing={1}>
            <FieldLabel textProps={{ opacity: props.isDisabled ? ".4" : "", size: "16px" }} loading={loading} isRequired={props.isRequired} label={label} />
            <AppSkeleton isLoaded={loading}>
                <Select
                    style={{ boxShadow: "unset" }}
                    isInvalid={error ? true : false}
                    {...FormModel.styleProps()}
                    size="lg"
                    iconSize={"30px"}
                    padding={0}
                    {...props}
                    value={value ? items.find((el) => el.value === value) : value}
                    items={items}
                    labelAccessor='caption'
                    valueAccessor='value'
                />
            </AppSkeleton>
            <ErrorLabel message={error} />
        </VStack>
    )
}

export default AppSelectBox