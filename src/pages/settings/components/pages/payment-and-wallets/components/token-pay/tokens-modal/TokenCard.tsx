import { Flex } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import SwitchBox from 'components/redesign/switch-box/SwitchBox';
import { IPaymentPublicService } from 'services/shop/interfaces';
import React, { useState } from 'react';
import TokensIcon from './TokensIcon';
import { useFormikContext } from 'formik';
import { ISettings } from 'pages/settings/utils/formConfigs';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface Props {
    token: IPaymentPublicService;
}

export default function TokenCard({ token }: Props) {
    const { t } = useLocaleResources('settings');
    const { values, setFieldValue } = useFormikContext<ISettings>();

    // Initialize checked state based on whether the token is active in paymentMethods
    const [isChecked, setChecked] = useState(() => {
        return !!values.paymentMethods.find((item) => item.type === token.symbol)?.isActive;
    });

    // Handle toggle logic for the switch
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isActive = e.target.checked;

        // Update paymentMethods array based on the toggle state
        const updatedMethods = isActive
            ? updateOrAddMethod(values.paymentMethods, token.symbol, isActive)
            : removeMethod(values.paymentMethods, token.symbol);

        setFieldValue("paymentMethods", updatedMethods); // Update Formik state
        setChecked(isActive); // Update local state
    };

    // Helper function to add or update a method in the array
    const updateOrAddMethod = (methods, symbol, isActive) => {
        const existingMethod = methods.find((item) => item.type === symbol);

        if (existingMethod) {
            return methods.map((item) =>
                item.type === symbol ? { ...item, isActive } : item
            );
        }

        return [...methods, { type: symbol, isActive }];
    };

    // Helper function to remove a method from the array
    const removeMethod = (methods, symbol) => {
        return methods.filter((item) => item.type !== symbol);
    };

    return (
        <Flex flexDir="column" width="100%" border="1px solid" borderColor="neutral.gray.800" borderRadius="8px">
            <Flex
                width="100%"
                justifyContent="space-between"
                p={6}
                borderBottom="1px solid"
                borderColor="neutral.gray.800"
            >
                <AppTypography fontSize="16px" fontWeight={500} color="neutral.white">
                    {token.type}
                </AppTypography>
                <SwitchBox
                    isDisabled={token.isActive}
                    isChecked={isChecked}
                    onToggle={handleToggle}
                />
            </Flex>
            <Flex gap={2} px={6} py={4} alignItems="center" justifyContent="space-between">
                <Flex flexDir="column">
                    <AppTypography color="text.subtext.placeholder.dark" fontSize="12px">
                        {t('settings.paymentsWallets.tokens.networks')}
                    </AppTypography>
                    <Flex flexWrap={"wrap"} gap={2} alignItems="center" justifyContent={"start"} sx={{ rect: { fill: "#292929" } }}>
                        {token.supportedChains.map((chain, index) => (
                            <React.Fragment key={index}>
                                <AppTypography color="neutral.white" fontSize="12px">
                                    {chain.type}
                                </AppTypography>
                                {index !== token.supportedChains.length - 1 && <AppIcons.DotSpacer />}
                            </React.Fragment>
                        ))}
                    </Flex>
                </Flex>
                <TokensIcon chains={token.supportedChains} />
            </Flex>
        </Flex>
    );
}
