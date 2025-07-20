import { Flex, Image, Text } from '@chakra-ui/react';
import { PlusSm } from 'assets/icons/Sign/Plus/PlusSm';
import AppButton from 'components/redesign/button/AppButton';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import ProductTypeSelector from '../ProductTypeSelector/ProductTypeSelector';

function EmptyProductList() {
    const { t } = useLocaleResources('products');

    return (
        <Flex
            width="100%"
            height="80vh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Image
                width="420px"
                height="352px"
                src="https://upload-file-droplinked.s3.amazonaws.com/34486d750011c9c70ff3a03fce40a866be649d583f049a1dbfa341c551d8e7f6_or.png"
                alt={t('productTable.empty.alt')}
            />

            <Text mt="64px" mb="16px" color="#fff">
                {t('productTable.empty.description')}
            </Text>

            <ProductTypeSelector placement='top'>
                <AppButton variant='normal' leftIcon={<PlusSm color='#2BCFA1' />}>
                    {t('pageHeader.actions.newProduct')}
                </AppButton>
            </ProductTypeSelector>
        </Flex>
    )
}

export default EmptyProductList