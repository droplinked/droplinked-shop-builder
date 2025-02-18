import { Box, Popover, PopoverContent, PopoverContentProps, PopoverProps, PopoverTrigger } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface IProps extends PopoverProps {
    nodes: {
        trigger: ReactNode;
        content: {
            children: ReactNode | ((props: { onClose: () => void }) => ReactNode);
            props?: PopoverContentProps;
        };
    };
}

function AppPopoverOnHover({ nodes: { trigger, content }, ...props }: IProps) {
    return (
        <Popover placement="bottom" trigger="hover" {...props}>
            {({ isOpen, onClose }) => (
                <>
                    <PopoverTrigger>
                        <Box as="button">{trigger}</Box>
                    </PopoverTrigger>
                    <PopoverContent {...content.props}>
                        {
                            typeof content.children === "function" ?
                                content.children({ onClose })
                                : content.children
                        }
                    </PopoverContent>
                </>
            )}
        </Popover>
    );
}

export default AppPopoverOnHover;
