import { Textarea as ChakraTextarea, FormLabel, InputGroup, Text, TextareaProps, Flex, Box } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import { TooltipMd } from 'assets/icons/Sign/Tooltip/TooltipMd'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import React from 'react'

interface Props extends TextareaProps {
  label?: string
  description?: string
  maxCharacters?: number
  state?: 'success' | 'error'
  stateColor?: string
  message?: string
  showErrorIcon?: boolean
  tooltipText?: string
}

export default function Textarea({ label, description, maxCharacters, state, stateColor = "#fff", message, showErrorIcon = true, tooltipText, ...rest }: Props) {
  const borderColorMap = { success: "#2BCFA1", error: "#F24" }

  const baseTextareaProps: TextareaProps = {
    padding: "12px 16px",
    border: "1px solid",
    borderColor: borderColorMap[state] || "#292929",
    resize: "none",
    rows: 3,
    placeholder: "What's up?",
    maxLength: maxCharacters,
    color: "#FFF",
    transition: "border-color 0.1s ease-out",
    _placeholder: { color: "#7B7B7B" },
    _hover: { borderColor: borderColorMap[state] || "#3C3C3C" },
    _focus: { borderColor: borderColorMap[state] || "#7B7B7B" },
    _focusVisible: {},
    ...rest
  }

  return (
    <InputGroup display="flex" flexDirection="column">
      {label && (
        <Flex gap={2} alignItems={"center"} mb={description ? 1 : 4}>
          <FormLabel fontSize={16} fontWeight={500} color="#FFF">
            {label}
          </FormLabel>
          {tooltipText && <AppTooltip label={tooltipText}>
            <Box>
              <TooltipMd color='#292929' />
            </Box>
          </AppTooltip>
          }
        </Flex>
      )}

      {description && <Text mb={4} fontSize={14} color="#7B7B7B">{description}</Text>}

      <ChakraTextarea {...baseTextareaProps} />

      {(message || maxCharacters) && (
        <Flex
          mt={2}
          paddingInline={4}
          css={{ p: { fontSize: 12, color: stateColor } }}
        >
          {message && (
            <Flex alignItems="center" gap={2}>
              {showErrorIcon && <AppIcons.WhiteWarning />}
              <Text>{message}</Text>
            </Flex>
          )}
          {maxCharacters && (
            <Text marginLeft="auto">
              {`${rest.value?.toString()?.length || 0}/${maxCharacters}`}
            </Text>
          )}
        </Flex>
      )}
    </InputGroup>
  )
}