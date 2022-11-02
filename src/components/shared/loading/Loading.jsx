import React from 'react';

import { Box ,Spinner } from '@chakra-ui/react';

function Loading() {
	return (
		<Box
			display='flex'
			alignItems="center"
			justifyContent='center'
			h='auto'
		>
			<Spinner size='xl' color='#8053ff' />
		</Box>
	);
}

export default Loading;
