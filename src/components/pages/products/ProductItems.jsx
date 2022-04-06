import React, { useState } from 'react';
import { Box, Badge } from '@chakra-ui/react';
import { BsBookmark } from 'react-icons/bs';

function ProductItems({ imageURL, brandName, cost }) {
	// state for showing save button
	const [showView, setView] = useState(false);

	return (
		<Box>
			<Box
				display={'flex'}
				flexDirection="column"
				justifyContent={'space-between'}
				maxW="sm"
				boxShadow={'xl'}
				borderRadius="lg"
				backgroundImage={imageURL}
				backgroundSize="cover"
				backgroundPosition={'center'}
				height="15rem"
				onMouseEnter={() => {
					setView(true);
				}}
				onMouseLeave={() => {
					setView(false);
				}}
			>
				<Box
					display={'flex'}
					alignSelf={'end'}
					position={'relative'}
					padding="2"
				>
					<Badge
						borderRadius="full"
						px="2"
						colorScheme=""
						bgColor={'white'}
						color="rgb(97,97,97)"
						padding={'5px'}
						textAlign={'center'}
						cursor="pointer"
					>
						<BsBookmark size={'20'} />
					</Badge>
				</Box>
				<Box
					display={showView ? 'flex' : 'none'}
					alignItems="baseline"
					position={'relative'}
					padding="2"
				>
					<Badge
						borderRadius="full"
						bgColor={'white'}
						color="rgb(97,97,97)"
						padding={'5px'}
						textAlign={'center'}
						cursor="pointer"
					>
						View
					</Badge>
				</Box>
			</Box>
			<Box>
				<Box
					mt="1"
					textAlign={'left'}
					fontWeight="semibold"
					as="h4"
					lineHeight="tight"
					isTruncated
				>
					{brandName}
				</Box>
				<Box>
					<Box as="span" fontWeight={'bold'} color="green.600" fontSize="sm">
						$ {cost}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

ProductItems.defaultProps = {
	imageURL:
		'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29_2.jpg/800px-Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29_2.jpg',
	brandName: 'Product',
	cost: 75,
};

export default ProductItems;
