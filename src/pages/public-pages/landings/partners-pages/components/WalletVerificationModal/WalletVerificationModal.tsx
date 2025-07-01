import { Box, Flex, ModalBody, StyleProps, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import WalletStatusSideIcons from 'components/common/walletStatus/WalletStatusSideIcons'
import AppButton from 'components/redesign/button/AppButton'
import AppModal from 'components/redesign/modal/AppModal'
import React, { useContext, useMemo } from 'react'
import { TFunction } from 'i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PartnerContext, { StepsType } from '../../context/partner.context'
import { useWalletVerification } from './useWalletVerification'
import enLocale from 'locales/public-pages/landings/partners-pages/en.json'
import arLocale from 'locales/public-pages/landings/partners-pages/ar.json'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'


interface ButtonConfig {
	label: string;
	onClick: () => void;
	rightIcon?: React.ReactElement;
	styles?: StyleProps;
}

interface StepConfig {
	title: string;
	description: string;
	buttons: {
		left?: ButtonConfig | null;
		right: ButtonConfig;
	};
}

const WalletVerificationModal = () => {
	const { t } = useLocaleResources("public-pages/landings/partners-pages", {
		en: enLocale,
		ar: arLocale
	})
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { planDurationMonths, states: { currentStep }, methods: { updateStates } } = useContext(PartnerContext)
	const { connectWallet } = useWalletVerification()

	const getConnectWalletSteps = (): Record<StepsType, StepConfig> => ({
		connect: {
			title: t('walletVerification.steps.connect.title'),
			description: t('walletVerification.steps.connect.description', { planDurationMonths }),
			buttons: {
				left: { 
					label: t('walletVerification.steps.connect.buttons.close'), 
					onClick: onClose, 
					styles: {} 
				},
				right: {
					label: t('walletVerification.steps.connect.buttons.checkEligibility'),
					onClick: async () => await connectWallet(),
					rightIcon: <AppIcons.SidebarNext />,
					styles: {}
				}
			}
		},
		loading: {
			title: t('walletVerification.steps.loading.title'),
			description: t('walletVerification.steps.loading.description'),
			buttons: {
				left: {
					label: t('walletVerification.steps.loading.buttons.close'),
					onClick: () => { },
					styles: { background: '#292929', color: '#737373', cursor: 'not-allowed' }
				},
				right: {
					label: t('walletVerification.steps.loading.buttons.checkEligibility'),
					onClick: () => { },
					rightIcon: <AppIcons.SidebarNext stroke="#737373" />,
					styles: {
						background: '#292929',
						color: '#737373',
						cursor: 'not-allowed',
						border: 'none'
					}
				}
			}
		},
		error: {
			title: t('walletVerification.steps.error.title'),
			description: t('walletVerification.steps.error.description'),
			buttons: {
				left: null,
				right: {
					label: t('walletVerification.steps.error.buttons.return'),
					onClick: () => updateStates({ key: 'currentStep', value: 'connect' })
				}
			}
		},
		done: {
			title: t('walletVerification.steps.done.title'),
			description: t('walletVerification.steps.done.description', { planDurationMonths }),
			buttons: {
				left: null,
				right: {
					label: t('walletVerification.steps.done.buttons.claimNow'),
					onClick: () => {
						const d3Id = searchParams.get('d3-id')
						const udId = searchParams.get('ud-id')

						const newParams = new URLSearchParams()
						newParams.set('entry', 'signup')

						if (d3Id) newParams.set('d3-id', d3Id)
						if (udId) newParams.set('ud-id', udId)

						navigate(`/onboarding/?${newParams.toString()}`)
					}
				}
			}
		}
	});

	const connect_wallet_steps = getConnectWalletSteps();
	const current_state = useMemo(() => connect_wallet_steps?.[currentStep], [currentStep, connect_wallet_steps])

	return (
		<>
			<AppButton
				paddingInline={{ base: 4, lg: 5 }}
				fontSize={{ base: 14, lg: 16 }}
				onClick={onOpen}
			>
				{t('walletVerification.claimNow')}
			</AppButton>

			<AppModal
				modalRootProps={{ isOpen, onClose, size: '3xl', isCentered: true }}
				modalContentProps={{ width: 'auto !important', padding: '0px !important' }}
			>
				<ModalBody
					display="flex"
					width={{ base: '360px', md: '625px' }}
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					gap="36px"
					padding={'0px !important'}
					paddingInline={'0px !important'}
					paddingBlock={'0px !important'}
					rounded="24px"
				>
					<WalletStatusSideIcons
						variant={currentStep === 'error' ? 'red' : 'green'}
						isLoading={currentStep === 'loading'}
						icon={currentStep === 'done' ? 'tick' : 'wallet'}
					/>

					<Flex
						padding={{ base: '0px 16px 36px 16px', md: '0px 48px 48px 48px', }}
						flexDirection="column"
						alignItems="flex-end"
						gap="48px"
						alignSelf="stretch"
					>
						<Flex
							flexDirection="column"
							alignItems="flex-start"
							gap="24px"
							alignSelf="stretch"
						>
							<AppTypography color="#FFF" fontSize={{ base: '18px', md: '24px' }} fontWeight="700">
								{current_state?.title}
							</AppTypography>
							<AppTypography color="#B1B1B1" fontSize={{ base: '14px', md: '16px' }} fontWeight="400">
								{current_state?.description}
							</AppTypography>
							<Flex
								flexDir={{ base: 'column', md: 'row' }}
								justifyContent="space-between"
								alignItems="flex-start"
								gap={{ base: '12px', md: 'auto' }}
								alignSelf="stretch"
							>
								<Flex alignItems='center' gap='12px' flex='1 0 0'>
									<Box
										as="svg"
										width="32px"
										height="32px"
										viewBox="0 0 32 32"
										fill="none"
									>
										<rect
											width="32"
											height="32"
											rx="16"
											fill="#2BCFA1"
											fill-opacity="0.1"
										/>
										<path
											d="M16 10L16.9535 13.5412C17.0698 13.9733 17.128 14.1894 17.2428 14.366C17.3444 14.5223 17.4777 14.6556 17.634 14.7572C17.8106 14.872 18.0267 14.9302 18.4588 15.0465L22 16L18.4588 16.9535C18.0267 17.0698 17.8106 17.128 17.634 17.2428C17.4777 17.3444 17.3444 17.4777 17.2428 17.634C17.128 17.8106 17.0698 18.0267 16.9535 18.4588L16 22L15.0465 18.4588C14.9302 18.0267 14.872 17.8106 14.7572 17.634C14.6556 17.4777 14.5223 17.3444 14.366 17.2428C14.1894 17.128 13.9733 17.0698 13.5412 16.9535L10 16L13.5412 15.0465C13.9733 14.9302 14.1894 14.872 14.366 14.7572C14.5223 14.6556 14.6556 14.5223 14.7572 14.366C14.872 14.1894 14.9302 13.9733 15.0465 13.5412L16 10Z"
											stroke="#2BCFA1"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</Box>
									<AppTypography color="#FFF" fontSize="14px" fontWeight="400">
										{t('walletVerification.features.proPlan', { planDurationMonths })}
									</AppTypography>
								</Flex>
								<Flex alignItems='center' gap='12px' flex='1 0 0'>
									<Box
										as="svg"
										width="32px"
										height="32px"
										viewBox="0 0 32 32"
										fill="none"
									>
										<rect
											x="0.5"
											width="32"
											height="32"
											rx="16"
											fill="#2BCFA1"
											fill-opacity="0.1"
										/>
										<path
											d="M20.9 10H12.1C11.2163 10 10.5 10.7163 10.5 11.6V20.4C10.5 21.2837 11.2163 22 12.1 22H20.9C21.7837 22 22.5 21.2837 22.5 20.4V11.6C22.5 10.7163 21.7837 10 20.9 10Z"
											stroke="#2BCFA1"
											stroke-width="1.5"
											stroke-miterlimit="10"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M17.8335 17L19.8335 14.6666M18.1192 18.1666C18.1192 18.811 17.6076 19.3333 16.9764 19.3333C16.3452 19.3333 15.8335 18.811 15.8335 18.1666C15.8335 17.5223 16.3452 17 16.9764 17C17.6076 17 18.1192 17.5223 18.1192 18.1666Z"
											stroke="#2BCFA1"
											stroke-linecap="round"
										/>
										<path
											d="M13.1665 16C13.1665 14.159 14.7584 12.6666 16.7221 12.6666C17.3697 12.6666 17.9769 12.8289 18.4998 13.1126"
											stroke="#2BCFA1"
											stroke-linecap="round"
										/>
									</Box>
									<AppTypography color="#FFF" fontSize="14px" fontWeight="400">
										{t('walletVerification.features.instantVerification')}
									</AppTypography>
								</Flex>
							</Flex>
							<Flex
								justifyContent="center"
								alignItems="center"
								gap="24px"
								alignSelf="stretch"
							>
								<Flex flex='1 0 0' alignItems='flex-start'>
									{current_state?.buttons?.left && (
										<AppButton
											variant='secondary'
											fontSize={{ base: '14px', md: '16px' }}
											lineHeight={{ base: '16px', md: '24px' }}
											onClick={current_state?.buttons?.left?.onClick}
											{...current_state?.buttons?.left?.styles}
										>
											{current_state?.buttons?.left?.label}
										</AppButton>
									)}
								</Flex>
								<AppButton
									fontSize={{ base: '14px', md: '16px' }}
									onClick={current_state?.buttons?.right?.onClick}
									{...current_state.buttons?.right?.styles}
								>
									{current_state?.buttons?.right?.label}
									{current_state?.buttons?.right?.rightIcon}
								</AppButton>
							</Flex>
						</Flex>
					</Flex>
				</ModalBody>
			</AppModal>
		</>
	)
}

export default WalletVerificationModal