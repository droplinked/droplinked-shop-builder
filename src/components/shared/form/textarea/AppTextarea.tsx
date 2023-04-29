import { Textarea, TextareaProps, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/shared/skeleton/AppSkeleton'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React from 'react'
import ErrorLabel from '../errorLabel/errorLabel'
import FieldLabel from '../fieldLabel/FieldLabel'
import FormModel, { IAppForm } from '../FormModel'

type combine = IAppForm & TextareaProps

interface Iprops extends combine { }

function AppTextarea(props: Iprops) {
  const { error, name, label, loading } = props

  return (
    <VStack align={"stretch"} width="100%" spacing={1}>
      <FieldLabel loading={loading} isRequired={props.isRequired} label={label} />
      <AppSkeleton isLoaded={loading}>
        <Textarea
          style={{ boxShadow: "unset" }}
          isInvalid={error ? true : false}
          placeholder={capitalizeFirstLetter(name)}
          {...FormModel.styleProps()}
          {...props}
        />
      </AppSkeleton>
      <ErrorLabel message={error} />
    </VStack>
  )
}

export default AppTextarea