import React from 'react'
import { WalletAddress } from './EVMWallet';
import { Box, Flex } from '@chakra-ui/react';
import Input from 'components/redesign/input/Input';
import Button from 'components/redesign/button/Button';
import AppIcons from 'assest/icon/Appicons';

export const WalletRow = ({
    wallet,
    onChange,
    onEdit,
    onDelete,
    onSave,
    isSingleWallet
}: {
    wallet: WalletAddress;
    onChange: (id: number, field: "address" | "percentage", value: string) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onSave: (id: number) => void;
    isSingleWallet: boolean;
}) => (
    <Flex alignItems={"center"} gap={4}>
        <Input
            inputProps={{
                placeholder: "Enter your wallet address",
                value: wallet.address,
                onChange: (e) => onChange(wallet.id, "address", e.target.value),
                isDisabled: !wallet.isEditing && !wallet.isNew
            }}
            inputContainerProps={{ padding: 2, paddingLeft: 4 }}
            rightElement={
                <Button
                    borderRadius={4}
                    fontSize={12}
                    fontWeight={500}
                    paddingInline={0}
                    visibility={(wallet.isEditing || wallet.isNew) ? "visible" : "hidden"}
                    paddingBlock={2}
                    px={3}
                    height={"min-content"}
                    isDisabled={!wallet.address}
                    onClick={() => onSave(wallet.id)}
                >
                    Save
                </Button>
            }
        />
        <Box width={"7rem"}>
            <Input
                inputProps={{
                    placeholder: "100",
                    value: wallet.percentage,
                    onChange: (e) => onChange(wallet.id, "percentage", e.target.value),
                    isDisabled: !wallet.isEditing && !wallet.isNew
                }}
                inputContainerProps={{ sx: { path: { stroke: "#4F4F4F" } } }}
                rightElement={<AppIcons.GrayPercent />}
            />
        </Box>
        <Flex gap={3} alignItems={"center"}>
            <Box
                as="button"
                onClick={() => onEdit(wallet.id)}
                opacity={(wallet.isEditing || wallet.isNew) ? 0.5 : 1}
                cursor={(wallet.isEditing || wallet.isNew) ? "not-allowed" : "pointer"}
            >
                <AppIcons.Edit style={{ width: "24px", height: "24px" }} />
            </Box>
            <Box
                as="button"
                onClick={() => onDelete(wallet.id)}
                opacity={isSingleWallet ? 0.5 : 1}
                cursor={isSingleWallet ? "not-allowed" : "pointer"}
            >
                <AppIcons.RedTrash style={{ width: "24px", height: "24px" }} />
            </Box>
        </Flex>
    </Flex>
);
