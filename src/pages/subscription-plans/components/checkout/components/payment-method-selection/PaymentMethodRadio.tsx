import { Box, Circle, Flex, FormLabel, useRadio } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';

export default function PaymentMethodRadio({ ...props }) {
	const { paymentMethod: { type }, ...radioProps } = props;
	const { t } = useLocaleResources('subscription');
	const { state: { isChecked }, getInputProps, htmlProps, getLabelProps } = useRadio(radioProps);

	return (
		<FormLabel
			width='100%'
			margin={0}
			display='flex'
			justifyContent='space-between'
			alignItems='center'
			border='1.5px solid'
			borderColor={`${isChecked ? '#2BCFA1' : 'neutral.gray.700'}`}
			borderRadius={8}
			padding={4}
			bg={isChecked ? '#2BCFA11A' : 'transparent'}
			cursor='pointer'
			{...htmlProps}
			{...getLabelProps()}
			sx={{ '*': { transition: 'inherit' } }}
		>
			<input {...getInputProps()} hidden />
			<Flex
				align={'center'}
				gap={3}
				sx={{
					p: {
						fontSize: 14,
						fontWeight: isChecked ? 500 : 400,
						color: isChecked ? '#2BCFA1' : '#fff',
					}
				}}
			>
				<Circle
					size={5}
					border={`1.5px solid ${isChecked ? '#2BCFA1' : '#fff'}`}
				>
					<Circle size={2.5} bg={'#2BCFA1'} opacity={isChecked ? 1 : 0} />
				</Circle>
				{type === 'STRIPE'
					? <AppTypography>{t('payment.methods.stripe')}</AppTypography>
					: (
						<Flex
							alignItems={'center'}
							sx={isChecked ? { 'svg path': { stroke: '#2BCFA1' } } : {}}
						>
							<AppIcons.Token />
							<AppTypography>
								<BlockchainDisplay blockchain={type} show="name" />
							</AppTypography>
						</Flex>
					)}
			</Flex>
			{ChainIconMap[type]}
		</FormLabel>
	)
}

const ChainIconMap: Record<string, React.JSX.Element> = {
	STRIPE: <AppIcons.NewStripe />,
	LINEA: <AppIcons.BlueLinea />,
	BINANCE: (
		<Box width={6} height={6}>
			<AppIcons.BnbChain />
		</Box>
	),
	POLYGON: <AppIcons.NewPolygon />,
	BASE: <AppIcons.BlueBase />,
	SKALE: (
		<Box width={6} height={6}>
			<AppIcons.Skale />
		</Box>
	),
	BITLAYER: (
		<Box width={6} height={6}>
			<AppIcons.Bitlayer />
		</Box>
	),
	REDBELLY: <AppIcons.NewRedbelly />,
	ETH: <AppIcons.ETH />
}