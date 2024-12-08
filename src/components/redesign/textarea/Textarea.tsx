import { FormLabel, InputGroup, Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface Props {
  label?: string;
  textareaProps?: TextareaProps;
  description?: string;
  error?: string;
}

export default function Textarea({ label, textareaProps, description, error }: Props) {
  const maxCharacters = 100

  const baseTextareaProps: TextareaProps = {
    maxLength: maxCharacters,
    rows: 3,
    mt: 4,
    border: "1px solid #292929",
    paddingBlock: 3,
    paddingInline: 4,
    placeholder: "What’s up?",
    color: "#7B7B7B",
    resize: "none" as "none",
    _placeholder: { color: "#7B7B7B" },
    _hover: {
      borderColor: "none",
      backgroundColor: "#1E1E1E",
      border: "1px solid #3C3C3C"
    },
    _focusVisible: {},
    _focus: {
      borderColor: "none",
      backgroundColor: "#1E1E1E",
      border: "1px solid #7B7B7B"
    },
    ...textareaProps
  }

  const textareaElement = (
    <ChakraTextarea
      {...baseTextareaProps}
    />
  )

  return (
    <InputGroup display="flex" flexDirection="column">
      {label && (
        <FormLabel margin={0} fontSize={16} color="white">
          {label}
          {description && <AppTypography mt={1} color={"#7B7B7B"} fontSize={"14px"}>{description}</AppTypography>}
        </FormLabel>
      )}
      {textareaElement}
      <AppTypography
        mt={2}
        mr={4}
        alignSelf="flex-end"
        color="#7B7B7B"
        userSelect="none"
      >
        {textareaProps.value.toString().length}/{maxCharacters}
      </AppTypography>
      {error && <AppTypography mt={2} fontSize={14} color={"#E53E3E"}>{error}</AppTypography>}
    </InputGroup>
  )
}