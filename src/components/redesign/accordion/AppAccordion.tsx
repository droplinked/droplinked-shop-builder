import React, { useState, createContext, useContext, ReactNode } from "react";
import { Box, Flex, BoxProps } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import AppIcons from "assest/icon/Appicons";

interface IAppAccordionProps extends BoxProps {
    multiCollapse?: boolean;
    alwaysOpen?: boolean;
    children: ReactNode;
}

interface IAppAccordionItemProps extends Omit<BoxProps, "children"> {
    defaultOpen?: boolean;
    isCollapsable?: boolean;
    itemId: string;
    children: ReactNode | Function;
}

interface IAppAccordionContextProps {
    expandedItems: string[];
    toggleItem: (id: string) => void;
    multiCollapse: boolean;
    alwaysOpen: boolean;
}

interface IAppAccordionItemContextProps {
    isOpen: boolean;
    onToggle: () => void;
}

const AppAccordionContext = createContext<IAppAccordionContextProps | undefined>(undefined);
const AppAccordionItemContext = createContext<IAppAccordionItemContextProps | undefined>(undefined);

const useAppAccordionContext = () => {
    const context = useContext(AppAccordionContext);
    if (!context) {
        throw new Error("AppAccordion components should be used within AppAccordion");
    }
    return context;
};

const useAppAccordionItemContext = () => {
    const context = useContext(AppAccordionItemContext);
    if (!context) {
        throw new Error("AppAccordionItem components should be used within AppAccordionItem");
    }
    return context;
};

export const AppAccordion = ({ children, multiCollapse = false, alwaysOpen = false, ...props }: IAppAccordionProps) => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setExpandedItems((prev) => {
            const isOpen = prev.includes(id);
            if (multiCollapse) {
                if (isOpen) return alwaysOpen && prev.length === 1 ? prev : prev.filter((item) => item !== id);
                return [...prev, id];
            } else {
                return isOpen ? (alwaysOpen ? prev : []) : [id];
            }
        });
    };

    return (
        <AppAccordionContext.Provider value={{ expandedItems, toggleItem, multiCollapse, alwaysOpen }}>
            <Box width={"full"} {...props}>
                {children}
            </Box>
        </AppAccordionContext.Provider>
    );
};

export const AppAccordionItem = ({ children, defaultOpen = false, isCollapsable = true, itemId, ...props }: IAppAccordionItemProps) => {
    const { expandedItems, toggleItem } = useAppAccordionContext();
    const isOpen = expandedItems.includes(itemId) || defaultOpen;
    const onToggle = () => {
        if (isCollapsable) toggleItem(itemId);
    };

    return (
        <AppAccordionItemContext.Provider value={{ isOpen, onToggle }}>
            <Box width={"full"} {...props}>
                {typeof children === "function" ? children({ isOpen, onToggle }) : children}
            </Box>
        </AppAccordionItemContext.Provider>
    );
};

export const AppAccordionTrigger = ({ children, ...props }: BoxProps) => {
    const { isOpen, onToggle } = useAppAccordionItemContext();
    return (
        <Flex width={"full"} alignItems="center" justifyContent="space-between" onClick={onToggle} cursor="pointer" {...props}>
            {children}
        </Flex>
    );
};

export const AppAccordionChevron = ({ ...props }: any) => {
    const { isOpen } = useAppAccordionItemContext();
    return <AppIcons.SidebarChevrondown width="20px" height="20px" style={{ transition: ".5s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} {...props} />;
};

export const AppAccordionPanel = ({ children, ...props }: BoxProps) => {
    const { isOpen } = useAppAccordionItemContext();

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
    );
};

const ExampleAccordion = () => {
    return (
        <AppAccordion multiCollapse={true} alwaysOpen={false}>
            <AppAccordionItem itemId="1">
                <AppAccordionTrigger>
                    <Box as="span">Item 1</Box>
                </AppAccordionTrigger>
                <AppAccordionPanel>
                    <Box p={4} border="1px solid #ccc">
                        Content for Item 1
                    </Box>
                </AppAccordionPanel>
            </AppAccordionItem>
            <AppAccordionItem itemId="2">
                <AppAccordionTrigger>
                    <Box as="span">Item 2</Box>
                </AppAccordionTrigger>
                <AppAccordionPanel>
                    <Box p={4} border="1px solid #ccc">
                        Content for Item 2
                    </Box>
                </AppAccordionPanel>
            </AppAccordionItem>
            <AppAccordionItem itemId="3">
                <AppAccordionTrigger>
                    <Box as="span">Item 3</Box>
                </AppAccordionTrigger>
                <AppAccordionPanel>
                    <Box p={4} border="1px solid #ccc">
                        Content for Item 3
                    </Box>
                </AppAccordionPanel>
            </AppAccordionItem>
        </AppAccordion>
    );
};

export default ExampleAccordion;
