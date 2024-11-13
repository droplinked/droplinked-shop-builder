import { Popover, PopoverArrow, PopoverContent, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import ShippingAvailabilityButton from './ShippingAvailabilityButton';
import ShippingAvailabilityContent from './content/ShippingAvailabilityContent';

function ShippingAvailabilityPopover() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <ShippingAvailabilityButton />
            <PopoverContent
                ref={popoverRef}
                w={{ base: "360px", md: "660px" }}
                margin={4}
                border="1px solid #292929"
                borderRadius={16}
                padding={0}
                bgColor="#1C1C1C"
                sx={{
                    ".chakra-popover__arrow-positioner": {
                        width: "16px !important",
                        height: "16px !important",
                        "--popper-arrow-size-half": "9px !important"
                    }
                }}
            >
                <PopoverArrow
                    borderTop="1px solid #292929"
                    borderLeft="1px solid #292929"
                    bgColor="#1C1C1C"
                    boxShadow="none"
                />
                <ShippingAvailabilityContent />
            </PopoverContent>
        </Popover>
    );
}

export default ShippingAvailabilityPopover;
