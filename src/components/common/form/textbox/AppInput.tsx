import { Input, InputProps, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React from 'react'
import ErrorLabel from '../errorLabel/errorLabel'
import FieldLabel from '../fieldLabel/FieldLabel'
import FormModel, { IAppForm } from '../FormModel'
import classes from './style.module.scss'

type combine = IAppForm & InputProps

interface Iprops extends combine { }

function AppInput(props: Iprops) {
  const { error, name, label, loading } = props

  return (
    <VStack align={"stretch"} width="100%" spacing="12px">
      <FieldLabel loading={loading} isRequired={props.isRequired} label={label} />
      <AppSkeleton isLoaded={loading} className={classes.input}>
        <Input
          style={{ boxShadow: "unset" }}
          isInvalid={error ? true : false}
          placeholder={capitalizeFirstLetter(name)}
          {...FormModel.styleProps()}
          {...props}
          value={props?.value || ""}
        />
      </AppSkeleton>
      <ErrorLabel message={error} />
    </VStack>
  )
}

export default AppInput