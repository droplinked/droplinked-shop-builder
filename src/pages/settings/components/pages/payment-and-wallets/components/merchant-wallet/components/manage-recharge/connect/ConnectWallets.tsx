import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay';
import AppCard from 'components/common/card/AppCard';
import ClipboardText from 'components/common/clipboardText/ClipboardText';
import AppTypography from 'components/common/typography/AppTypography';
import useStack from 'hooks/stack/useStack';
import useAppToast from 'hooks/toast/useToast';
import useAppWeb3 from 'hooks/web3/useWeb3';
import { supportedChainsService } from 'services/sku/services';
import useAppStore from 'stores/app/appStore';
import { isWalletInstalled } from 'droplinked-web3';
import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { ConnectWalletsLoading } from './connect.wallets.loading';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

function ConnectWallets() {
	const { t } = useLocaleResources('settings');
	const { data, isLoading } = useQuery({
		queryFn: supportedChainsService,
		queryKey: 'supported_chains',
		cacheTime: 60 * 60 * 1000,
	});
	const { getChain, login } = useAppWeb3();
	const { showToast } = useAppToast();
	const {
		user: { wallets },
	} = useAppStore();
	const stack = useStack();

	const loginChain = useCallback(
		async (chain: string) => {
			try {
				const { installed, walletName } =
					isWalletInstalled(chain);
				if (!installed) {
					showToast({
						type: 'error',
						            message: t("MerchantWallet.connect.errors.walletNotFound", { walletName: walletName }),
					});
					if (chain === 'STACKS')
						window.open(
							'https://www.xverse.app',
							'_blank'
						);
					return;
				}

				await login({ chain, wallets, stack });
			} catch (error) {
				showToast({
					            message: error || t("MerchantWallet.connect.errors.failedLogin"),
					type: 'warning',
				});
			}
		},
		[wallets, stack.stxAddress]
	);

	if (isLoading) return <ConnectWalletsLoading />;

	return (
		<AppCard>
			<VStack spacing={3} align="stretch">
				<VStack align="stretch" spacing="8px">
					{data?.data?.data &&
						data?.data?.data.map((el, key) => {
							const isExist = getChain({
								chain: el,
								wallets,
							});
							return (
								<Flex
									backgroundColor="#141414"
									height="55px"
									padding="0 18px"
									key={key}
									alignItems="center"
									justifyContent="space-between"
									borderRadius="8px"
									color="#C2C2C2"
								>
									<HStack alignItems="center">
										<BlockchainDisplay
											show="icon"
											props={{
												width: '18px',
												height: '18px',
											}}
											blockchain={
												el
											}
										/>
										<AppTypography
											fontSize="12px"
											color="neutral.gray.300"
										>
											<BlockchainDisplay
												show="name"
												blockchain={
													el
												}
											/>
										</AppTypography>
									</HStack>
									<Box>
										{isExist ? (
											<Flex
												gap="10px"
												alignItems="center"
											>
												<AppTypography fontSize="12px">{`${isExist?.address.substring(
													0,
													6
												)}....${isExist?.address.substring(
													isExist
														?.address
														.length -
													6
												)}`}</AppTypography>
												<ClipboardText
													text={
														isExist?.address
													}
												/>
											</Flex>
										) : (
											<BasicButton
												sizes="medium"
												onClick={() =>
													loginChain(
														el
													)
												}
											>
												                {t("MerchantWallet.connect.connectButton")}
											</BasicButton>
										)}
									</Box>
								</Flex>
							);
						})}
				</VStack>
			</VStack>
		</AppCard>
	);
}

export default ConnectWallets;
