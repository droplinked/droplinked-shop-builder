import { SelectProps, Select, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/shared/skeleton/AppSkeleton'
import React from 'react'
import ErrorLabel from '../errorLabel/errorLabel'
import FieldLabel from '../fieldLabel/FieldLabel'
import FormModel, { IAppForm } from '../FormModel'
import classes from './style.module.scss'

interface IAppSelectBoxItems {
    value: string | number | null
    caption: string
    [prop: string]: any
}

type combine = IAppForm & SelectProps

interface Iprops extends combine {
    items: Array<IAppSelectBoxItems>
}

function AppSelectBox(props: Iprops) {
    const { error, label, items, loading } = props

    return (
        <VStack align={"stretch"} width="100%" spacing={1}>
            <FieldLabel loading={loading} isRequired={props.isRequired} label={label} />
            <AppSkeleton isLoaded={loading}>
                <Select
                    style={{ boxShadow: "unset" }}
                    isInvalid={error ? true : false}
                    {...FormModel.styleProps()}
                    size="lg"
                    iconSize={"30px"}
                    padding={0}
                    className={classes.selectbox}
                    {...props}
                >
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