import { Box, BoxProps, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'

/**
 * AppLabel Component - Versatile label with different styles and states
 * 
 * Provides labels with various styling options including outline, filled, and muted variants,
 * multiple status colors, two size options, and support for left/right icons.
 * 
 * @param {object} props - Component props
 * @param {string|number} props.text - Text content to display in the label
 * @param {LabelVariant} [props.variant='outlined'] - Visual style variant
 * @param {LabelStatus} [props.status='neutral'] - Status color scheme
 * @param {LabelSize} [props.size='28'] - Label size (height in pixels)
 * @param {React.FunctionComponent<React.SVGProps<SVGSVGElement>>} [props.leftIcon] - Icon to display before text
 * @param {React.FunctionComponent<React.SVGProps<SVGSVGElement>>} [props.rightIcon] - Icon to display after text
 * @param {BoxProps} props - Additional Chakra UI box props
 */
type LabelVariant = "outlined" | "muted" | "filled"
type LabelStatus = "neutral" | "pending" | "success" | "error"
type LabelSize = "28" | "36"

interface Iprops extends BoxProps {
    text: string | number
    variant?: LabelVariant
    status?: LabelStatus
    size?: LabelSize
    leftIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    rightIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

type StyleConfig = {
    border?: string
    borderColor?: string
    bg: string
    color: string
}

type StatusStyles = {
    [key in LabelStatus]: StyleConfig
}

type StyleStyles = {
    [key in LabelVariant]: StatusStyles
}

function AppLabel({
    text,
    variant = "outlined",
    status = "neutral",
    size = "28",
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    ...props
}: Iprops) {
    const styles = useMemo(() => ({
        layout: {
            "28": {
                padding: "4px 8px",
                gap: "6px",
                borderRadius: "4px"
            },
            "36": {
                padding: "8px 12px",
                gap: "8px",
                borderRadius: "8px"
            }
        },
        status: {
            outlined: {
                neutral: {
                    border: "1px solid",
                    borderColor: "neutral.gray.600",
                    bg: "neutral.gray.750",
                    color: "neutral.white"
                },
                pending: {
                    border: "1px solid",
                    borderColor: "system.link",
                    bg: "label.link",
                    color: "text.link"
                },
                success: {
                    border: "1px solid",
                    borderColor: "main.primary",
                    bg: "label.primary",
                    color: "text.primary"
                },
                error: {
                    border: "1px solid",
                    borderColor: "system.error",
                    bg: "label.errorBackground",
                    color: "text.error"
                }
            },
            muted: {
                neutral: {
                    bg: "neutral.gray.800",
                    color: "neutral.white"
                },
                pending: {
                    bg: "label.link",
                    color: "text.link"
                },
                success: {
                    bg: "label.primary",
                    color: "text.primary"
                },
                error: {
                    bg: "label.errorBackground",
                    color: "text.error"
                }
            },
            filled: {
                neutral: {
                    bg: "neutral.black",
                    color: "neutral.white"
                },
                pending: {
                    bg: "system.link",
                    color: "neutral.white"
                },
                success: {
                    bg: "system.success",
                    color: "neutral.white"
                },
                error: {
                    bg: "system.error",
                    color: "neutral.white"
                }
            }
        } as StyleStyles
    }), [])

    const currentStyle = styles.status[variant][status]

    return (
        <Box
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            gap={styles.layout[size].gap}
            padding={styles.layout[size].padding}
            borderRadius={styles.layout[size].borderRadius}
            border={currentStyle.border}
            borderColor={currentStyle.borderColor}
            bg={currentStyle.bg}
            {...props}
        >
            {LeftIcon && <LeftIcon />}
            <Text
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="20px"
                fontSize={size === "28" ? "12px" : "14px"}
                color={currentStyle.color}
            >
                {text}
            </Text>
            {RightIcon && <RightIcon />}
        </Box>
    )
}

export default AppLabel