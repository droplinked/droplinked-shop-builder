import { ModalFooter } from '@chakra-ui/react';
import Button from 'components/redesign/button/Button';
import React from 'react';

interface Props {
    file: File | null
    closeModal: () => void
    onClick: () => void;
    isLoading: boolean;
}

function ImportProductModalFooter({ file, closeModal, onClick, isLoading }: Props) {
    return (
        <ModalFooter
            display="flex"
            justifyContent="space-between"
            gap={{ xl: 6, base: 3 }}
            paddingBlock="36px !important"
        >
            <Button variant='secondary' disabled={isLoading} onClick={closeModal}>Discard</Button>
            <Button onClick={onClick} isDisabled={!file || isLoading}>{isLoading ? "Uploading" : "Validate"}</Button>
        </ModalFooter>
    )
}

export default ImportProductModalFooter