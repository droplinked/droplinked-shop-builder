import React, { useState } from 'react';
import { Box, Badge } from '@chakra-ui/react';
import { BsBookmark } from 'react-icons/bs';
import {BrowserRouter as Router, Switch,Route,Link, useParams} from "react-router-dom";

function ProductItems({ imageURL, brandName, cost }) {
	// state for showing save button
	const [showView, setView] = useState(false);

	return (
		<Link to="/shopping" style={{textDecoration:"none"}}>
		<Box padding={['5', 0, 0, 0, 0]}>
			{/* these are buttons of each cards */}
			
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
				{/* book mark bar  */}
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

				{/* view card */}
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

			{/* brand name and cost */}
			<Box>
				{/* brand name */}
				<Box
					mt="1"
					textAlign={'left'}
					fontWeight="semibold"
					as="h4"
					fontSize={['25', 20, 20, 20]}
				>
					{brandName}
				</Box>
				{/* cost name */}
				<Box>
					<Box
						as="span"
						fontWeight={'bold'}
						color="green.600"
						fontSize={['25', 20, 20, 20]}
					>
						$ {cost}
					</Box>
				</Box>
			</Box>
		</Box>
		</Link>
	);
}

ProductItems.defaultProps = {
	imageURL:
		'https://martinvalen.com/13342/men-s-notch-sole-sneakers-in-full-white.jpg',
	brandName: 'Product',
	cost: 75,
};

export default ProductItems;
