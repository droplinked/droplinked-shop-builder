import { Textarea, TextareaProps, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import { capitalizeFirstLetter } from 'lib/utils/helpers/helpers'
import React from 'react'
import ErrorLabel from '../form/errorLabel/errorLabel'
import FieldLabel from '../form/fieldLabel/FieldLabel'
import FormModel, { IAppForm } from '../form/FormModel'
import AppTypography from 'components/common/typography/AppTypography'

type combine = IAppForm & TextareaProps

interface Iprops extends combine { }

function AppTextarea(props: Iprops) {
  const { error, name, label, loading, description } = props

  return (
    <VStack align={"stretch"} width="100%" spacing={4}>
      <VStack align={"stretch"} spacing={"4px"}>
        <FieldLabel loading={loading} isRequired={props.isRequired} label={label} />
        {description && <AppTypography color={"#7B7B7B"} fontSize={"14px"}>{description}</AppTypography>}
      </VStack>
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