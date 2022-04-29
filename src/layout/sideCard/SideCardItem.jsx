import React , {useState} from 'react';

import PropTypes from 'prop-types';
import { Box, Image, Text } from '@chakra-ui/react';


function SideCardItem({ title, color, size, cost, image , amount , product , detail}) {
	console.log(product);
	return (
		<Box
			color={'white'}
			display="flex"
			padding={'20px'}
			flexDirection="center"
			alignItems={'center'}
			// fontSize="lg"
			boxShadow="16px 16px 36px #181818,
             -16px -16px 36px #2c2c2c;"
			width={'95%'}
			margin="auto"
			borderRadius={'10'}
			marginY="2"
		>
			{/* image */}
			<Box paddingX="2" width={'100%'} maxWidth={"80px"}>
				<Image src={image} borderRadius="10"></Image>
			</Box>

			{/* content */}
			<Box display={'flex'} flexDirection="column">
				{/* header */}
				<Text noOfLines={1} paddingX={2} fontWeight={'semibold'}>
					{title}
				</Text>

				{/* information */}
				<Box display={'flex'} color="gray" fontWeight={'semibold'}>
					{/* color */}
					{/* <Box display={'flex'} justifyContent="center" alignItems={'center'}>
						<Text padding={'2'}>Color:</Text>
						<Box
							backgroundColor={color}
							width="2"
							height="2"
							borderRadius={'sm'}
						></Box>
					</Box> */}
					{/* size */}
					<Box display={'flex'} justifyContent="center" alignItems={'center'}>
						<Text padding={'2'}>{detail}</Text>
					</Box>
					{/* cost */}
					<Box
						display={'flex'}
						justifyContent="center"
						alignItems={'center'}
						color="white"
					>
						<Text padding={'2'}>${cost}</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

SideCardItem.defaultProps = {
	title: 'T-shirt Summer Vibes',
	color: 'gray',
	size: 'xs',
	cost: '89.9',
	image:
		'https://martinvalen.com/13342/men-s-notch-sole-sneakers-in-full-white.jpg',
};

SideCardItem.propTypes = {
	title: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.string,
};

export default SideCardItem;
