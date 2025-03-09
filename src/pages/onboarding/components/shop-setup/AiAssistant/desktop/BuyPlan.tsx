import { Box, Flex, Grid, ModalBody, Text } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import { plans } from 'pages/onboarding/constants/plans'
import React, { useState } from 'react'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function BuyPlan({ isOpen, onClose }: Props) {
    const [selectedPlan, setSelectedPlan] = useState("");

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "6xl", isCentered: true }}
            modalContentProps={{ background: "#1C1C1C", paddingBlock: "0" }}
        >
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }}>
                <Flex flexDirection={"column"}>
                    <ModalHeaderData
                        icon={
                            <ModalHeaderIconWrapper>
                                <MagicwandLg color='#fff' />
                            </ModalHeaderIconWrapper>
                        }
                        title="Use droplinked AI to create your shop"
                        description="Feel free to use our AI tools to customize your shop. Subscribe below to get started."
                        descriptionProps={{ color: "#B1B1B1 !important" }}
                        modalHeaderProps={{
                            paddingBlock: "48px !important",
                            borderBottom: "1px solid #292929",
                        }}
                    />

                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        gap={6}
                        padding={"48px !important"}
                    >
                        <Text color={"#fff"} fontSize={16}>Billing Cycle</Text>
                        <Flex width={"100%"} flexDirection={"column"} gap={4} userSelect={"none"}>
                            {plans.map((item, index) => {
                                const isSelected = selectedPlan === item.title;
                                const border = isSelected ? "1.5px solid #2BCFA1" : "1.5px solid #292929";
                                const color = isSelected ? "#2BCFA1" : "#fff";
                                const background = isSelected ? "rgba(43, 207, 161, 0.10)" : "transparent";

                                return (
                                    <Flex
                                        key={index}
                                        background={background}
                                        padding={4}
                                        borderRadius={8}
                                        onClick={() => setSelectedPlan(item.title)}
                                        border={border}
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                        width={"100%"}
                                        cursor={"pointer"}
                                        transition="all 0.3s ease"
                                    >
                                        <Text
                                            color={color}
                                            fontSize={14}
                                            fontWeight={500}
                                            transition="color 0.3s ease"
                                        >
                                            {item.title}
                                        </Text>
                                        <Flex alignItems={"center"} gap={"6px"}>
                                            <Text
                                                textDecoration="line-through"
                                                color={item.hasDiscount ? "#F24" : "#fff"}
                                                fontSize={12}
                                                transition="color 0.3s ease"
                                            >
                                                {item.hasDiscount && `$${item.price}`}
                                            </Text>
                                            <Text
                                                color={"#fff"}
                                                fontSize={14}
                                                fontWeight={500}
                                                transition="color 0.3s ease"
                                            >
                                                {item.isFree ? "Free" : item.priceByDiscount}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                )
                            })}
                        </Flex>
                    </ModalBody>
                </Flex>

                <Box
                    background={"url(https://upload-file-droplinked.s3.amazonaws.com/c70ef55941bba2eff8331f1989513c821a616ae33b9d66e8f3350fff7a2abf57.png)"}
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    backgroundPosition="center"
                    height="800px"
                />

            </Grid>
        </AppModal>
    )
}
