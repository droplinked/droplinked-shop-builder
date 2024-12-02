import { HStack } from '@chakra-ui/react';
import Button from 'components/redesign/button/Button';
import { Collection } from 'lib/apis/collection/interfaces';
import * as React from 'react';
import { UseMutationResult } from 'react-query';
interface ModalButtonsProps {
    collection?: Collection;
    createService: UseMutationResult<any, unknown, any, unknown>;
    updateService: UseMutationResult<any, unknown, any, unknown>;
    close: () => void;
}
function ModalButtons({ collection, createService, updateService, close }: ModalButtonsProps) {
    return (
        <HStack borderTop={"1px solid #292929"} py={"2rem"} justifyContent="space-between">
            <Button fontSize={"14px"} background={"#292929"} variant='secondary' width={"79px"} onClick={close}>{collection ? 'Cancel' : 'Discard'}</Button>
            <Button fontSize={"14px"} type="submit" width={"79px"} isLoading={createService.isLoading || updateService.isLoading}>
                {collection ? 'Edit' : 'Create'}
            </Button>
        </HStack>
    );
}

export default ModalButtons;