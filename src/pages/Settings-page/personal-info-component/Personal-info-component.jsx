import { Flex, Box, Text } from '@chakra-ui/react'
import { useState } from 'react';
import { useProfile } from "../../../context/profile/ProfileContext"
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import { useToasty } from "../../../sevices/hooks/useToastify"

import InputImage from '../../../components/shared/InputImage/InputImage'
import FormInput from '../../../components/shared/FormInput/FormInput'
import BasicButton from '../../../components/shared/BasicButton/BasicButton'
import axios from "axios"

export default function PersonalInfoComponent() {

    const profile = JSON.parse(localStorage.getItem("profile"));
    let token = JSON.parse(localStorage.getItem("token"));

    const { updateProfile } = useProfile();
    const { errorToast, successToast } = useToasty()

    // console.log(profile);

    const [profileImage, setProfileImage] = useState(profile.avatar)
    const [firstName, setFirstName] = useState(profile.firstname)
    const [lastName, setLastName] = useState(profile.lastname)
    const email = profile.email;
    const [phoneNumber, setPhoneNumber] = useState(profile.phone)
    const [disableBtn, setDisableBtn] = useState(false)


    const changeFirstName = e => {
        setFirstName(e.target.value)
    }

    const changeLastName = e => {
        setLastName(e.target.value)
    }

    const changePhonenumber = e => {
        setPhoneNumber(e.target.value)
    }

    const submitForm = async () => {

        let profileData = {
            firstname: firstName,
            lastname: lastName,
            avatar: profileImage,
            phone: phoneNumber
        }

        setDisableBtn(true)

        await axios.put(`${BasicURL}/profile`, profileData,
            { headers: { Authorization: "Bearer " + token } })
            .then(e => {
                successToast('Profile updated successfully')
                updateProfile(e.data.data.user)
            })
            .catch(e => {
                errorToast(e.response.data.reason)
            })
            
        setDisableBtn(false)

    }

    return (
        <Box
            color='white'
            fontSize='22px'
            w="100%"
        >
            <InputImage image={profileImage} setImage={setProfileImage} />
            <Flex
                mt="30px"
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
            <FormInput mt='30px' label={"Phone Number"} value={phoneNumber} changeValue={changePhonenumber} type={'number'} />

            <Flex
                justifyContent='end'
                alignItems='center'
                mt='50px'
            >
                <BasicButton
                    p='12px 16px'
                    w={{ base: "100%", md: "40%" }}
                    disabled={disableBtn}
                    onClick={submitForm}
                >Submit</BasicButton>
            </Flex>
        </Box>
    )
} 