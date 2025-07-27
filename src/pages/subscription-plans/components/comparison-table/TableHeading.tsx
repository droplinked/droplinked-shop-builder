import { Text, VStack } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import * as React from 'react';

function TableHeading() {
    const { t } = useLocaleResources('subscription');

    return (
        <VStack>
            <Text color={"white"} fontSize={"28px"} fontWeight={700}>
                {t('TableHeading.title')}
            </Text>
            <Text color={"#B1B1B1"} width={"702px"} textAlign={"center"} fontSize={"20px"} fontWeight={400}>
                {t('TableHeading.description')}
            </Text>
        </VStack>
    );
}

export default TableHeading;