import { useMediaQuery } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

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
