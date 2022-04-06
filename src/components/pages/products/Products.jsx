import React from 'react';
import MainWrapper from '../../Structure/page wrapper/MainWrapper';
import MainHeader from '../../features/header/MainHeader';
import Footer from '../../features/footer/Footer';
import { Box, Text } from '@chakra-ui/react';
import ProductItems from './ProductItems';
import { Grid, GridItem } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Products({ productHeader }) {
	return (
		<>
			{/* header */}
			<MainHeader />

			{/* main */}
			<MainWrapper>
				{/* items */}
				<Box color={'white'}>
					{/* product title */}
					<Text fontWeight={'semibold'} fontSize="3xl" pb="7">
						{productHeader}
					</Text>
					<Grid templateColumns="repeat(4, 1fr)" gap={6}>
						<GridItem>
							<ProductItems />
						</GridItem>
						<GridItem>
							<ProductItems />
						</GridItem>
						<GridItem>
							<ProductItems />
						</GridItem>
						<GridItem>
							<ProductItems />
						</GridItem>
						<GridItem>
							<ProductItems />
						</GridItem>
						<GridItem>
							<ProductItems />
						</GridItem>
						<GridItem>
							<ProductItems />
						</GridItem>
						<GridItem>
							<ProductItems />
						</GridItem>
						<GridItem>
							<ProductItems />
						</GridItem>
						<GridItem>
							<ProductItems />
						</GridItem>
						<GridItem>
							<ProductItems />
						</GridItem>
						<GridItem>
							<ProductItems />
						</GridItem>
					</Grid>
				</Box>
			</MainWrapper>
			<Footer />
		</>
	);
}

Products.defaultProps = {
	productHeader: 'Products',
};

Products.propTypes = {
	productHeader: PropTypes.string,
};

export default Products;
