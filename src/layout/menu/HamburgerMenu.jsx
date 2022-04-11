import React from 'react';
import {
	Box,
	Text,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Flex,
} from '@chakra-ui/react';
import { FiChevronsDown } from 'react-icons/fi';

function HamburgerMenu({ children }) {
	return (
		<Box textAlign={'right'} padding="5">
			<Menu>
				<MenuButton
					px={4}
					py={2}
					transition="all 0.2s"
					borderRadius="md"
					boxShadow="16px 16px 36px #181818,
             -16px -16px 36px #2c2c2c;"
					_hover={{ bg: 'gray.400' }}
					_focus={{ boxShadow: 'outline' }}
					backgroundColor={'#2c2c2c'}
				>
					<FiChevronsDown color="white" />
				</MenuButton>
				<MenuList
					backgroundColor={'#2c2c2c'}
					display="flex"
					color="white"
					margin={'5'}
					border="none"
				>
					{children}
				</MenuList>
			</Menu>
		</Box>
	);
}

export default HamburgerMenu;
