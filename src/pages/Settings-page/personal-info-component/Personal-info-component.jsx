import { Flex, Box, Text } from '@chakra-ui/react'
import { useState } from 'react';

import InputImage from '../../../components/shared/InputImage/InputImage'
import FormInput from '../../../components/shared/FormInput/FormInput'

export default function PersonalInfoComponent() {
    const profile = JSON.parse(localStorage.getItem("profile"));

    const [profileImage, setProfileImage] = useState(profile.avatar)
    const [firstName, setFirstName] = useState(profile.firstname)
    const [lastName, setLastName] = useState(profile.lastname)
    const email = profile.email;
    const [phoneNumber, setPhoneNumber] = useState(profile.phone)

    const changeFirstName = e => {
        setFirstName(e.target.value)
    }

    const changeLastName = e => {
        setLastName(e.target.value)
    }

    const changePhonenumber = e => {
        setPhoneNumber(e.target.value)
    }


    return (
        <Text
            color='white'
            fontSize='22px'
            w="100%"
        >
            <InputImage image={profileImage} setImage={setProfileImage} />
            <Flex
                justifyContent='space-between'
                alignItems='center'
            >
                <Box w="45%">
                    <FormInput label={"First Name"} value={firstName} changeValue={changeFirstName} />
                </Box>
                <Box w="45%">
                    <FormInput label={"Last Name"} value={lastName} changeValue={changeLastName} />
                </Box>
            </Flex>
            <FormInput mt='30px' label={"Email"} value={email} />
            <FormInput mt='30px' label={"Phone Number"} value={phoneNumber} changeValue={changePhonenumber}  type={'number'}/>
        </Text>
    )
} 