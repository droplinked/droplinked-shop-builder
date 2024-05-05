import { Box, Button, Popover, PopoverBody, PopoverCloseButton, PopoverContent, PopoverContentProps, PopoverFooter, PopoverProps, PopoverTrigger, Portal, useDisclosure } from "@chakra-ui/react";
import React from "react";

interface IProps extends PopoverProps {
    nodes: {
        trigger: {
            children: React.ReactNode;
        };
        content: {
            children: React.ReactNode;
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
                        <Button backgroundColor={"transparent"} _hover={{ backgroundColor: "transparent" }} border={"none"}>
                            {trigger.children}
                        </Button>
                    </PopoverTrigger>
                    {/* <Portal> */}
                        <PopoverContent {...content.props}>{content.children}</PopoverContent>
                    {/* </Portal> */}
                </>
            )}
        </Popover>
    );
}

export default AppPopoverOnHover;
