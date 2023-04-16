import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { BlackBox, PageContentWrapper, StarLabel, Text18px, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React from 'react'
import editIcon from "assest/icon/edit-icon.svg";
import MetaMask from "assest/icon/MetaMask.svg";
import AppSwitch from 'components/shared/swich'
import SaveIcon from "assest/icon/frame20783.svg";
import classes from './style.module.scss'

function Payments() {
    return (
        <VStack
            spacing={3}
            align='stretch'
        >
            <Box>
                <Text18px>Payment Method <StarLabel>*</StarLabel></Text18px>
            </Box>
            <Box>
                <Text fontSize="sm" color="lightGray">
                    Activate the payment methods and choose your target wallet for each of them
                </Text>
            </Box>
            <VStack align='stretch' spacing={3}>
                <VStack spacing={2} align={"stretch"}>
                    
                    <BlackBox padding={3}>
                        <HStack justifyContent="space-between">
                            <HStack>
                                <Box position={"relative"} bottom={1.9}><AppSwitch /></Box>
                                <Box><TextLabelBold>STX Payment</TextLabelBold></Box>
                            </HStack>
                            <HStack>
                                <PageContentWrapper padding={3}>
                                    <HStack alignItems="center" spacing={4}>
                                        <Box position={"relative"} top={.9}>
                                            <input type="text" className={classes.textbox} placeholder='Target wallet pubic key' />
                                        </Box>
                                        <Box><Image src={SaveIcon} w="16px" h="16px" /></Box>
                                    </HStack>
                                </PageContentWrapper>
                            </HStack>
                        </HStack>
                    </BlackBox>

                    <BlackBox padding={3}>
                        <HStack justifyContent="space-between">
                            <HStack>
                                <Box position={"relative"} bottom={1.9}><AppSwitch /></Box>
                                <Box><TextLabelBold>STX Payment</TextLabelBold></Box>
                            </HStack>
                            <HStack>
                                <PageContentWrapper padding={3}>
                                    <HStack alignItems="center" spacing={4}>
                                        <Box position={"relative"} top={.9}>
                                            <input type="text" className={classes.textbox} value={"234-423-4234-2343"} />
                                        </Box>
                                        <Box><Image src={editIcon} w="16px" h="16px" /></Box>
                                    </HStack>
                                </PageContentWrapper>
                            </HStack>
                        </HStack>
                    </BlackBox>

                    <BlackBox padding={3}>
                        <HStack justifyContent="space-between">
                            <HStack>
                                <Box position={"relative"} bottom={1.9}><AppSwitch /></Box>
                                <Box><TextLabelBold>CSPR Payment</TextLabelBold></Box>
                            </HStack>
                            <HStack padding={3} alignItems="center" spacing={4}>
                                <Box><Image src={MetaMask} w="16px" h="16px" /></Box>
                                <Box position={"relative"} top={.9}>
                                    <Text fontSize="sm" color="lightGray">
                                        234 ... 9839
                                    </Text>
                                </Box>
                                <Box><Image src={editIcon} w="16px" h="16px" /></Box>
                            </HStack>
                        </HStack>
                    </BlackBox>
                </VStack>
            </VStack>
        </VStack>
    )
}

export default Payments