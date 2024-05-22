import { Button, Popover, PopoverContent, PopoverContentProps, PopoverProps, PopoverTrigger } from "@chakra-ui/react";
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
                        <Button padding={0} backgroundColor={"transparent"} _hover={{ backgroundColor: "transparent" }} border={"none"}>
                            {trigger.children}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent {...content.props}>{content.children}</PopoverContent>
                </>
            )}
        </Popover>
    );
}

export default AppPopoverOnHover;
