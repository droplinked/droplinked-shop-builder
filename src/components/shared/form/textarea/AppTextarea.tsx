import { Input, Textarea, TextareaProps, VStack } from '@chakra-ui/react'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React from 'react'
import ErrorLabel from '../errorLabel/errorLabel'
import FieldLabel from '../fieldLabel/FieldLabel'
import FormModel, { IAppForm } from '../FormModel'

type combine = IAppForm & TextareaProps

interface Iprops extends combine { }

function AppTextarea(props: Iprops) {
  const { error, name, label } = props

  return (
    <VStack align={"stretch"} width="100%" spacing={1}>
      <FieldLabel isRequired={props.isRequired} label={label} />
      <Textarea
        style={{ boxShadow: "unset" }}
        isInvalid={error ? true : false}
        placeholder={capitalizeFirstLetter(name)}
        {...FormModel.styleProps()}
        {...props}
      />
      <ErrorLabel message={error} />
    </VStack>
  )
}

export default AppTextarea