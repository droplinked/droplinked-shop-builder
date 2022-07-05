import { Flex, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'

import AddressBookComponent from './address-book-component/address-book-component'
import ShopInfoComponent from './shop-info-component/Shop-info-component'
import PersonalInfoComponent from './personal-info-component/Personal-info-component'


export default function SettingsPage() {

    const profile = JSON.parse(localStorage.getItem("profile"));

    const [settingComponent, setSettingComponent] = useState("personal")
 
    return (
        <Flex
            w="100%"
            px={{ base: "20px", md: "80px" }}
            justifyContent="center"
        >
            <Flex
                w="100%"
                maxW="900px"
                border='1px'
                borderColor='#b3b3b3'
                borderRadius="16px"
                flexDirection={{ base: "column", md: 'row' }}
            >
                <Flex
                    p="40px 10px"

                    borderBottom={{ base: '1px', md: '0px' }}
                    borderColor="white"
                    minW={{ base: '100%', md: "25%" }}
                    flexDirection='column'
                >
                    <SettingButton
                        click={() => { setSettingComponent("personal") }}
                    > Personal info </SettingButton>
                    {(profile.type == "PRODUCER") &&
                        <SettingButton
                            click={() => { setSettingComponent("shop") }}
                        > Shop info </SettingButton>
                    }
                    <SettingButton
                        click={() => { setSettingComponent("address") }}
                    >Address book</SettingButton>
                </Flex>

                <Flex
                    w='100%'
                    p='40px 30px'
                    justifyContent='center'
                    alignItems='center'
                >
                    {(() => {
                        switch (settingComponent) {
                            case "personal":
                                return (<PersonalInfoComponent />)
                            case "shop":
                                return (<ShopInfoComponent />)
                            case "address":
                                return (<AddressBookComponent />)
                        }
                    })()}
                </Flex>

            </Flex>

        </Flex>
    )
}


const SettingButton = ({ children, click }) => {

    return (<>
        <Button
            color="white"
            m='0px auto'
            w="90%"
            minW="150px"
            borderRadius='8px'
            fontWeight='500'
            fontSize='16px'
            textAlign='center'
            p='12px 0px'
            mb='15px'
            bgColor='transparent'
            border='1px'
            borderColor="#8053ff"
            _hover={{ bgColor: '#8053ff' }}
            onClick={click}
        >
            {children}
        </Button>
    </>)
}