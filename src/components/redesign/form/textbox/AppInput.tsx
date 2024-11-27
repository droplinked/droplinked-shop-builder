import { Input, InputProps, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import { capitalizeFirstLetter } from 'lib/utils/helpers/helpers'
import React from 'react'
import ErrorLabel from '../errorLabel/errorLabel'
import FieldLabel from '../fieldLabel/FieldLabel'
import FormModel, { IAppForm } from '../FormModel'
import classes from './style.module.scss'
import AppTypography from 'components/common/typography/AppTypography'

type combine = IAppForm & InputProps

interface Iprops extends combine { }

function AppInput(props: Iprops) {
  const { error, name, label, loading, description } = props

  return (
    <VStack align={"stretch"} width="100%" spacing="16px">
      <VStack align={"stretch"} spacing={"4px"}>
        <FieldLabel loading={loading} isRequired={props.isRequired} label={label} />
        {description && <AppTypography color={"#7B7B7B"} fontSize={"14px"}>{description}</AppTypography>}
      </VStack>
      <AppSkeleton isLoaded={loading} className={classes.input}>
        <Input
          style={{ boxShadow: "unset" }}
          isInvalid={error ? true : false}
          placeholder={capitalizeFirstLetter(name)}
          {...FormModel.styleProps()}
          {...props}
          value={props?.value || ""}
          _invalid={{ borderColor: "#FF2244" }}
        />
      </AppSkeleton>
      <ErrorLabel message={error} />
    </VStack>
  )
}

export default AppInput