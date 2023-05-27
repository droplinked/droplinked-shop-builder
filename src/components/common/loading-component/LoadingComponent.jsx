import React from 'react';

import { Box ,Spinner } from '@chakra-ui/react';

function LoadingComponent() {
	return (
		<Box
			display='flex'
			alignItems="center"
			justifyContent='center'
			h='auto'
		>
			<Spinner size='xl' color='primary' />
		</Box>
	);
}

export default LoadingComponent;
