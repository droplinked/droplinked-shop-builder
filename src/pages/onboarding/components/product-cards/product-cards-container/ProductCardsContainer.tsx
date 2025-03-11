import { useBreakpointValue } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"
import RightSectionWrapper from "../../common/RightSectionWrapper"
import DesktopCardsContainer from "./DesktopCardsContainer"
import TabletCardsContainer from "./TabletCardsContainer"
import XLargeCardsContainer from "./XLargeCardsContainer"

export default function ProductCardsContainer({ children }: PropsWithChildren) {
    const ContainerComponent = useBreakpointValue({
        base: TabletCardsContainer,  // Up to 1279px
        xl: DesktopCardsContainer,   // 1280px to 1919px
        "3xl": XLargeCardsContainer  // 1920px and up
    })

    return (
        <RightSectionWrapper
            paddingTop={{ base: 0, xl: 12, "3xl": "80px" }}
            paddingRight={0}
            paddingBottom={0}
            paddingLeft={{ base: 0, xl: 12, "3xl": "80px" }}
        >
            <ContainerComponent>
                {children}
            </ContainerComponent>
        </RightSectionWrapper>
    )
}