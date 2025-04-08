import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import { AnimatePresence, motion } from "framer-motion"
import React, { createContext, useContext, useEffect, useState } from "react"

interface IAppAccordionProps extends BoxProps {
    multiCollapse?: boolean
    alwaysOpen?: boolean
}

interface IAppAccordionItemProps extends BoxProps {
    itemId: string
    defaultOpen?: boolean
    isCollapsable?: boolean
}

interface IAppAccordionContextProps {
    expandedItems: string[]
    setExpandedItems: React.Dispatch<React.SetStateAction<string[]>>
    toggleItem: (id: string) => void
    multiCollapse: boolean
    alwaysOpen: boolean
}

interface IAppAccordionItemContextProps {
    isOpen: boolean
    onToggle: () => void
}

const AppAccordionContext = createContext<IAppAccordionContextProps | undefined>(undefined)
const AppAccordionItemContext = createContext<IAppAccordionItemContextProps | undefined>(undefined)

const useAppAccordionContext = () => {
    const context = useContext(AppAccordionContext)

    if (!context) {
        throw new Error("useAppAccordionContext must be used within an <AppAccordion> component.")
    }
    return context
}

export const useAppAccordionItemContext = () => {
    const context = useContext(AppAccordionItemContext)

    if (!context) {
        throw new Error("useAppAccordionItemContext must be used within an <AppAccordionItem> component.")
    }
    return context
}

export const AppAccordion = ({ children, multiCollapse = false, alwaysOpen = false, ...props }: IAppAccordionProps) => {
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    const toggleItem = (id: string) => {
        setExpandedItems((prev) => {
            const isOpen = prev.includes(id)

            if (multiCollapse) {
                if (isOpen) return alwaysOpen && prev.length === 1 ? prev : prev.filter((item) => item !== id)
                return [...prev, id]
            }
            else {
                return isOpen ? (alwaysOpen ? prev : []) : [id]
            }
        })
    }

    return (
        <AppAccordionContext.Provider value={{ expandedItems, setExpandedItems, toggleItem, multiCollapse, alwaysOpen }}>
            <Box width="full" {...props}>
                {children}
            </Box>
        </AppAccordionContext.Provider>
    )
}

export const AppAccordionItem = ({ itemId, defaultOpen, isCollapsable = true, children, ...props }: IAppAccordionItemProps) => {
    const { expandedItems, setExpandedItems, toggleItem } = useAppAccordionContext()

    const isOpen = expandedItems.includes(itemId)
    const onToggle = () => isCollapsable && toggleItem(itemId)

    useEffect(() => {
        if (defaultOpen) setExpandedItems((prev) => [...prev, itemId])
    }, [defaultOpen])

    return (
        <AppAccordionItemContext.Provider value={{ isOpen, onToggle }}>
            <Box width="full" {...props}>
                {children}
            </Box>
        </AppAccordionItemContext.Provider>
    )
}

export const AppAccordionTrigger = ({ children, ...props }: FlexProps) => {
    const { onToggle } = useAppAccordionItemContext()

    return (
        <Flex
            width="full"
            alignItems="center"
            justifyContent="space-between"
            cursor="pointer"
            {...props}
            onClick={onToggle}
        >
            {children}
        </Flex>
    )
}

export const AppAccordionChevron = ({ ...props }: any) => {
    const { isOpen } = useAppAccordionItemContext()

    return (
        <AppIcons.SidebarChevrondown
            width="20px"
            height="20px"
            color="white"
            style={{ transition: ".5s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            {...props}
        />
    )
}

export const AppAccordionPanel = ({ children, ...props }: BoxProps) => {
    const { isOpen } = useAppAccordionItemContext()

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "linear" }}
                    style={{ overflow: "hidden" }}
                >
                    <Box {...props}>{children}</Box>
                </motion.div>
            )}
        </AnimatePresence>
    )
}