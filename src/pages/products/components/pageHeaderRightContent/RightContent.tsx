import { Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import Button from 'components/redesign/button/Button';
import * as React from 'react';

interface Props {
    onProductTypeModalOpen: () => void;
    onImportModalOpen: () => void;
    onReorderModalOpen: () => void;
}

function RightContent({ onProductTypeModalOpen, onImportModalOpen, onReorderModalOpen }: Props) {

    return (
        <Flex flexDirection="row-reverse" gap={4}>
            <Button
                _hover={{ opacity: "0.8" }}
                paddingBlock="10px"
                paddingInline="14px"
                fontSize={14}
                fontWeight={500}
                leftIcon={<AppIcons.BlackPlus />}
                onClick={onProductTypeModalOpen}
            >
                New Product
            </Button>
            <Button
                _hover={{ opacity: "0.8" }}
                paddingBlock="10px"
                paddingInline="14px"
                fontSize={14}
                fontWeight={500}
                leftIcon={<AppIcons.Download />}
                onClick={onImportModalOpen}
                variant='secondary'
            >
                Import
            </Button>
            <Button
                _hover={{ opacity: "0.8" }}
                paddingBlock="10px"
                paddingInline="14px"
                fontSize={14}
                fontWeight={500}
                leftIcon={<AppIcons.VerticalMove />}
                onClick={onReorderModalOpen}
                variant='secondary'
            >
                Reorder Products
            </Button>
        </Flex>
    );
}

export default RightContent;