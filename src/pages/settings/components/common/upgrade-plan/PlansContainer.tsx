import { Box, Flex } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import AppButton from 'components/redesign/button/AppButton';
import React from 'react';
import PlanCard from './PlanCard';

interface Props {
    onOpen: () => void;
    isFetching: boolean;
}

export default function PlansContainer({ onOpen, isFetching }: Props) {
    const border = "1px solid #2BCFA1";

    return (
        <Flex userSelect="none" gap="28px" flex={1} flexDirection="column">
            <PlanCard
                icon={<AppIcons.EnterprisePlan />}
                title="Enterprise"
                description="Contact us to explore integration."
                styles={{
                    filter: "blur(2px)",
                    position: "relative",
                    bottom: "1rem",
                    left: "15rem",
                    width: "100%",
                    gap: 4,
                    border: "1px solid #333",
                    borderRadius: "16px",
                    background: "#222",
                    padding: "16px",
                    zIndex: -1,
                }}
            />
            <Flex
                width="100%"
                gap={4}
                borderTop={border}
                borderLeft={border}
                borderBottom={border}
                borderLeftRadius="16px"
                background="#2BCEA11A"
                alignItems="center"
                justifyContent="space-between"
                p={4}
            >
                <Flex gap={4} alignItems="center">
                    <Box height={"min-content"} bg="#2BCEA11A" p={2} borderRadius="8px">
                        <AppIcons.PremiumPlan color="#fff" />
                    </Box>
                    <Flex flexDir="column">
                        <AppTypography color="#fff" fontSize="18px" fontWeight={700}>
                            Premium
                        </AppTypography>
                        <AppTypography color="#B1B1B1" fontSize="14px" fontWeight={400}>
                            Designed for large businesses needing comprehensive solutions.
                        </AppTypography>
                    </Flex>
                </Flex>
                <AppButton onClick={onOpen} isLoading={isFetching}>
                    Unlock Features
                </AppButton>
            </Flex>
            <PlanCard
                icon={<AppIcons.StarOutline style={{ width: "27px", height: "27px" }} />}
                title="Pro Plan"
                description="For small businesses and teams ready to grow."
                styles={{
                    filter: "blur(2px)",
                    position: "relative",
                    top: "1rem",
                    left: "15rem",
                    width: "100%",
                    gap: 4,
                    border: "1px solid #333",
                    borderRadius: "16px",
                    background: "#222",
                    padding: "16px",
                    zIndex: -1,
                }}
            />
        </Flex>
    );
}
