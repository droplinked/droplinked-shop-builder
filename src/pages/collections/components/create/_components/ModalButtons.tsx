import { HStack } from '@chakra-ui/react';
import BasicButton from 'components/redesign/BasicButton/BasicButton';
import { Collection } from 'lib/apis/collection/interfaces';
import * as React from 'react';
import { UseMutationResult } from 'react-query';
interface ModalButtonsProps {
    collection?: Collection;
    createService: UseMutationResult<any, unknown, any, unknown>;
    updateService: UseMutationResult<any, unknown, any, unknown>;
}
function ModalButtons({ collection, createService, updateService }: ModalButtonsProps) {
    return (
        <HStack borderTop={"1px solid #292929"} py={"2rem"} justifyContent="space-between">
            <BasicButton background={"#292929"} variant='ghost' width={"79px"} >{collection ? 'Cancel' : 'Discard'}</BasicButton>
            <BasicButton type="submit" width={"79px"} isLoading={createService.isLoading || updateService.isLoading}>
                {collection ? 'Edit' : 'Create'}
            </BasicButton>
        </HStack>
    );
}

export default ModalButtons;