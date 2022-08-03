import { Flex } from '@chakra-ui/react'
import { useState } from 'react'

import AddressBookComponent from './address-book-component/address-book-component'
import ShopInfoComponent from './shop-info-component/Shop-info-component'
import PersonalInfoComponent from './personal-info-component/Personal-info-component'
import SettingButton from "./setting-button-component"


export default function SettingsPage() {

    // this state use for selected setting 
    const [settingComponent, setSettingComponent] = useState("personal")

    const profile = JSON.parse(localStorage.getItem("profile"));

    // change state by click on buttons for change setting component used  
    const personalSetting = () => {
        setSettingComponent("personal")
    }

    const shopSetting = () => {
        setSettingComponent("shop")
    }

    const addressSetting = () => {
        setSettingComponent("address")
    }

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
                    {/* select setting buttons  */}
                    <SettingButton click={personalSetting} active={settingComponent == "personal"}> Personal info </SettingButton>

                    {(profile.type == "PRODUCER") &&
                        <SettingButton click={shopSetting} active={settingComponent == "shop"} > Shop info </SettingButton>
                    }

                    <SettingButton click={addressSetting} active={settingComponent == "address"}>Address book</SettingButton>
                    {/* select setting buttons  */}
                </Flex>

                {/* setting component  */}
                <Flex
                    w='100%'
                    p='40px 30px'
                    justifyContent='center'
                    alignItems='center'
                    overflow='hidden'
                >
                    {(() => {
                        switch (settingComponent) {
                            case "personal":
                                return (<PersonalInfoComponent active={settingComponent} />)
                            case "shop":
                                return (<ShopInfoComponent active={settingComponent}/>)
                            case "address":
                                return (<AddressBookComponent active={settingComponent}/>)
                        }
                    })()}
                </Flex>
                {/* setting component  */}

            </Flex>

        </Flex>
    )
}
