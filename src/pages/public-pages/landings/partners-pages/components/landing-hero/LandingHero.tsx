import { Flex, Grid, Image } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";
import LogosDisplay from "./LogosDisplay";
import PrimaryHeading from "../common/PrimaryHeading";
import WalletVerificationModal from "../WalletVerificationModal/WalletVerificationModal";

interface props {
    heading: string;
    description: string;
    valueText?: string; 
   
}

const LandingHero = ({ heading, description, valueText }:props) => {
    return (
        <Grid
            pos="relative"
            minHeight="800px"
            height="100dvh"
            placeContent="center"
            bgImg="https://upload-file-droplinked.s3.amazonaws.com/145845cc06183af4e2cc76892c744e6fe8e258c6b4e4905ad1d6102a10cf5ab9.png"
            bgSize="cover"
            bgPos="center"
        >
            <Flex
                maxWidth={{ base: "100%", md: "650px", lg: "772px", xl: "856px" }}
                direction="column"
                alignItems="center"
                gap={{ base: 10, lg: 12 }}
                paddingInline={{ base: 8, md: 4 }}
                sx={{ "p": { textAlign: "center", color: "white" } }}
            >
                <PrimaryHeading as="h1" fontSize={{ base: 28, md: 48, lg: 56, xl: 64 }} textAlign={"center"} >{heading}</PrimaryHeading>
                <LogosDisplay/>
                <AppTypography fontSize={{ base: 14, md: 20 }}>
                    {description}
                </AppTypography>
                <Flex flexDirection="column" gap={4}>
                    <WalletVerificationModal/>
                    {valueText && (
                        <AppTypography fontSize={{ base: 14, md: 16 }} fontWeight={500}>
                            {valueText}
                        </AppTypography>
                    )}
                </Flex>
            </Flex>

            <Image
                position="absolute"
                bottom={0}
                src="https://upload-file-droplinked.s3.amazonaws.com/961dc9e15e29cadb56eed323d25be4aec396882358b11bec70cba07e4e9e55b1.png"
            />
        </Grid>
    );
};

export default LandingHero;
