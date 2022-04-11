import React from 'react';
import MainWrapper from '../../Structure/page wrapper/MainWrapper';
import MainHeader from '../../features/header/MainHeader';
import Footer from '../../features/footer/Footer';
import { Box, Text } from '@chakra-ui/react';
import ProductItems from './ProductItems';
import { SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import SideCard from '../../../layout/sideCard/SideCard';

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

					{/* grid section for make products like columns */}
					<SimpleGrid columns={[1, 2, 4, 4, 4]} gap={6}>
						{/* this is just for test, another day we wanna get data from server */}
						<ProductItems />

						<ProductItems />

						<ProductItems />

						<ProductItems />

						<ProductItems />

						<ProductItems />

						<ProductItems />

						<ProductItems />

						<ProductItems />

						<ProductItems />

						<ProductItems />

						<ProductItems />
					</SimpleGrid>
				</Box>
			</MainWrapper>

			{/* footer */}
			<Footer />
		</>
	);
}

// default props
Products.defaultProps = {
	productHeader: 'Products',
};

// proptypes
Products.propTypes = {
	productHeader: PropTypes.string,
};

export default Products;
