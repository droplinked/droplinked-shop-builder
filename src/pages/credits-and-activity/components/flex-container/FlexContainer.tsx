import { useMediaQuery } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import MobileContainer from "./MobileContainer";
import DesktopContainer from "./DesktopContainer";

interface Props {
    items: {
        content: ReactNode;
        isFullWidth?: boolean;
    }[];
}

export default function FlexContainer({ items }: Props) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

    return (
        isSmallerThan768 ? <MobileContainer items={items} /> : <DesktopContainer items={items} />
    );
}
