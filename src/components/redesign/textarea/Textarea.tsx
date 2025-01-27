import { Textarea as ChakraTextarea, FormLabel, InputGroup, Text, TextareaProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends TextareaProps {
  label?: string
  description?: string
  maxCharacters?: number
}

export default function Textarea({ label, description, maxCharacters, ...rest }: Props) {
  const baseTextareaProps: TextareaProps = {
    padding: "12px 16px",
    border: "1px solid #292929",
    resize: "none",
    rows: 3,
    placeholder: "What’s up?",
    maxLength: maxCharacters,
    color: "#FFF",
    transition: "border-color 0.1s ease-out",
    _placeholder: { color: "#7B7B7B" },
    _hover: { borderColor: "#3C3C3C" },
    _focus: { borderColor: "#7B7B7B" },
    _focusVisible: {},
    ...rest
  }

  return (
    <InputGroup display="flex" flexDirection="column">
      {label && (
        <FormLabel mb={description ? 1 : 4} fontSize={16} fontWeight={500} color="#FFF">
          {label}
        </FormLabel>
      )}

      {description && <Text mb={4} fontSize={14} color="#7B7B7B">{description}</Text>}

      <ChakraTextarea {...baseTextareaProps} />

      {maxCharacters && (
        <Text mt={2} mr={4} alignSelf="flex-end" fontSize={12} color="#FFF" userSelect="none">
          {rest.value.toString().length}/{maxCharacters}
        </Text>
      )}
    </InputGroup>
  )
}