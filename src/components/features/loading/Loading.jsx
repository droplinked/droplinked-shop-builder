import React from 'react';
import './style.css';
import { Box } from '@chakra-ui/react';

function Loading() {
	return (
		<Box
			display={'flex'}
			alignItems="center"
			justifyContent={'center'}
			height="50vh"
		>
			<div id="fountainG">
				<div id="fountainG_1" class="fountainG"></div>
				<div id="fountainG_2" class="fountainG"></div>
				<div id="fountainG_3" class="fountainG"></div>
				<div id="fountainG_4" class="fountainG"></div>
				<div id="fountainG_5" class="fountainG"></div>
				<div id="fountainG_6" class="fountainG"></div>
				<div id="fountainG_7" class="fountainG"></div>
				<div id="fountainG_8" class="fountainG"></div>
			</div>
		</Box>
	);
}

export default Loading;
