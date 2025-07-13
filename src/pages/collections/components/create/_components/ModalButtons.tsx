import { HStack } from '@chakra-ui/react';
import AppButton from 'components/redesign/button/AppButton';
import { Collection } from 'services/collection/interfaces';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import * as React from 'react';
import { UseMutationResult } from 'react-query';

interface ModalButtonsProps {
    collection?: Collection;
    createService: UseMutationResult<any, unknown, any, unknown>;
    updateService: UseMutationResult<any, unknown, any, unknown>;
    close: () => void;
}

function ModalButtons({ collection, createService, updateService, close }: ModalButtonsProps) {
    const { t } = useLocaleResources("collections");

    return (
        <HStack borderTop={"1px solid"} borderColor="neutral.gray.800" py={"2rem"} justifyContent="space-between">
            <AppButton background={"neutral.gray.800"} variant='secondary' width={"79px"} onClick={close}>
                {collection ? t("create.buttons.cancel") : t("create.buttons.discard")}
            </AppButton>
            <AppButton type="submit" width={"79px"} isLoading={createService.isLoading || updateService.isLoading}>
                {collection ? t("create.buttons.edit") : t("create.buttons.create")}
            </AppButton>
        </HStack>
    );
}

export default ModalButtons;