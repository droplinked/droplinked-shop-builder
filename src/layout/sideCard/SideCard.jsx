import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
  } from "react-router-dom";
  import { useCart } from  "../../sevices/hooks/useCart"

function SideCard({ children }) {
	const {  total } = useCart();

	return (
		// side card component with title - cost - checkout and this component get children for showing product item
		<Box
			display={'flex'}
			color={'white'}
			boxShadow="16px 16px 36px #181818,
             -16px -16px 36px #2c2c2c;"
			width={'20rem'}
			borderRadius={'5'}
			flexDirection="column"
			justifyContent={'space-between'}
			margin="5"
		>
			<Box padding={'20px'} display="flex" justifyContent={'space-between'}>
				{/* title */}
				<Box>
					<Text fontWeight={'bold'} paddingX="2">
						My Cart
					</Text>
				</Box>
				{/* total cost */}
				<Box display={'flex'} fontWeight="semibold">
					<Text paddingX={'5'} color="gray">
						total cost
					</Text>
					<Text>$ {total}</Text>
				</Box>
			</Box>

			{/* side Card items */}
			<Box>{children}</Box>

			{/* checkout button */}
			<Button
				backgroundColor={'#5E56F5'}
				_hover={{
					opacity: 0.8,
				}}
				width={'25%'}
				alignSelf="self-end"
				margin="2"
			>
			<Link to="/shopping">
				checkout
				</Link>
			</Button>
		</Box>
	);
}

export default SideCard;
