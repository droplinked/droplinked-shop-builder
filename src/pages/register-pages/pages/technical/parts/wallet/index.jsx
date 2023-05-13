import { Box, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { StarLabel, Text18px } from 'pages/register-pages/RegisterPages-style'
import React from 'react'
import classes from './style.module.scss'
import MetaMask from "assest/icon/MetaMask.svg";
import moreIcon from "assest/icon/more-icon.svg";
import BasicButton from 'components/shared/BasicButton/BasicButton';
import WalletModal from './parts/modal';
import FieldLabel from 'components/shared/form/fieldLabel/FieldLabel';

function Wallet() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <VStack
                spacing={3}
                align='stretch'
            >
                <Box>
                    <FieldLabel label='Connected Wallets' isRequired />
                </Box>
                <HStack justifyContent="space-between" spacing={5} alignItems="center">
                    <Box>
                        <Text fontSize="sm" color="lightGray">
                            You can connect multiple wallets and choose your target wallet from among them
                        </Text>
                    </Box>
                    <Box>
                        <BasicButton variant='outline' onClick={onOpen} sizes="medium">Connect Wallet</BasicButton>
                    </Box>
                </HStack>
                <Box>
                    <table className={classes.table}>
                        <thead>
                            <th><Text fontSize="sm">Wallets</Text></th>
                            <th></th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <HStack>
                                        <Box><Image src={MetaMask} w="22px" h="22px" /></Box>
                                        <Box position="relative" top={1}>
                                            <Text fontSize="sm" color="lightGray">
                                                R343FH...R343FH
                                            </Text>
                                        </Box>
                                    </HStack>
                                </td>
                                <td>
                                    <Box className={classes.more}>
                                        <Menu>
                                            <MenuButton>
                                                <Image src={moreIcon} w="18px" h="18px" />
                                            </MenuButton>
                                            <MenuList minWidth="70px" className={classes.menu}>
                                                <MenuItem>disconnect</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
            </VStack>
            <WalletModal close={onClose} open={isOpen} />
        </>
    )
}

export default Wallet