import { Box, Center, Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import { fileSizeInMB } from "lib/utils/helpers/helpers";
import React from 'react';

interface Props {
    file: File;
    onFileChange: (file: File | null) => void;
}

export function FilePreview({ file, onFileChange }: Props) {
    const tranucatedName = file?.name?.length > 20 ? file.name.substring(0, 20) + '...' : file?.name

    if (!file) {
        return null
    }


    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            border="1px solid #292929"
            borderRadius={8}
            padding={3}
            paddingRight={5}
        >
            <Flex alignItems="center" gap={4}>
                <Center width={14} height={14} borderRadius={4} bgColor="#292929">
                    <AppIcons.Document />
                </Center>
                <Box>
                    <AppTypography fontWeight={500} color="#fff">
                        {tranucatedName}
                    </AppTypography>
                    <AppTypography mt={2} fontSize={12} color="#7B7B7B">
                        {fileSizeInMB(file)} MB
                    </AppTypography>
                </Box>
            </Flex>

            <Box
                as="button"
                flexShrink={0}
                padding={2}
                onClick={() => onFileChange(null)}
            >
                <AppIcons.RedTrash />
            </Box>
        </Flex>
    )
}