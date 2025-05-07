import { Box, Textarea as ChakraTextarea, Flex, FormLabel, InputGroup, Text, TextareaProps } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import { AsteriskSm } from 'assets/icons/Sign/Asterisk/AsteriskSm'
import { TooltipMd } from 'assets/icons/Sign/Tooltip/TooltipMd'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import React from 'react'

/**
 * Enhanced textarea component with support for labels, validation states, and character count
 * 
 * @param {object} props - Component props extending Chakra UI's TextareaProps
 * @param {string} [props.label] - Label text displayed above textarea
 * @param {string} [props.description] - Descriptive text displayed below label
 * @param {number} [props.maxCharacters] - Maximum number of characters allowed with counter
 * @param {'success'|'error'} [props.state] - Validation state of the textarea
 * @param {string} [props.stateColor="#fff"] - Color for state messages
 * @param {string} [props.message] - Validation or help message to display
 * @param {boolean} [props.showErrorIcon=true] - Whether to show error icon with message
 * @param {string} [props.tooltipText] - Text to show in tooltip next to label
 * @param {boolean} [props.isRequired] - Whether the field is required (displays asterisk)
 * @param {string} [props.placeholder] - Placeholder text when textarea is empty
 * @param {string} [props.value] - Current value of the textarea
 * @param {function} [props.onChange] - Function called when textarea value changes
 * 
 * @returns {JSX.Element} Enhanced textarea component
 */
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
          <FormLabel display="flex" gap={1} alignItems="center" fontSize={16} fontWeight={500} color="#FFF">
            {label} {rest?.isRequired && <AsteriskSm width="12px" height="12px" color='#FF2244' />}
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