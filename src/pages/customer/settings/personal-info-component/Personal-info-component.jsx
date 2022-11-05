import { Flex, Box, keyframes, usePrefersReducedMotion } from '@chakra-ui/react'
import { useState } from 'react';
import { useProfile } from "../../../../context/profile/ProfileContext"
import { BASE_URL } from "../../../../api/BaseUrl"
import { useToasty } from "../../../../context/toastify/ToastContext"

import InputImage from '../../../../components/shared/InputImage/InputImage'
import FormInput from '../../../../components/shared/FormInput/FormInput'
import BasicButton from '../../../../components/shared/BasicButton/BasicButton'
import axios from "axios"


const keyframe_startanimation = keyframes`
0% {
    transform: translateX(-400px);
    opacity: 0;
}
100% {
  transform: translateX(0);
  opacity: 1;
}
`;

export default function PersonalInfoComponent({ active }) {

    const profile = JSON.parse(localStorage.getItem("profile"));
    let token = JSON.parse(localStorage.getItem("token"));

    const { updateProfileData } = useProfile();
    const { errorToast, successToast } = useToasty()
    const prefersReducedMotion = usePrefersReducedMotion();

    // profile image state
    const [profileImage, setProfileImage] = useState(profile.avatar)
    // first name state
    const [firstName, setFirstName] = useState(profile.firstname)
    // last name state
    const [lastName, setLastName] = useState(profile.lastname)
    // phone number state
    const [phoneNumber, setPhoneNumber] = useState(profile.phone)
    // state for disable or loading buttons
    const [disableBtn, setDisableBtn] = useState(false)

    const email = profile.email;

    // animation variable
    const startAnimation = prefersReducedMotion
        ? undefined
        : `${keyframe_startanimation}  0.2s linear`;


    // change firstname
    const changeFirstName = e => {
        setFirstName(e.target.value)
    }

    //cahnge lastname 
    const changeLastName = e => {
        setLastName(e.target.value)
    }

    // cahnge phone number
    const changePhonenumber = e => {
        setPhoneNumber(e.target.value)
    }


    const submitForm = async () => {
        // set all information in object 
        let profileData = {
            firstname: firstName,
            lastname: lastName,
            avatar: profileImage,
            phone: phoneNumber
        }

        // set buttons in loading state
        setDisableBtn(true)

        // send new personal data to back end
        await axios.put(`${BASE_URL}/profile`, profileData,
            { headers: { Authorization: "Bearer " + token } })
            .then(e => {
                successToast('Profile successfully updated')
                // update profile date if it is success full
                 updateProfileData()
            })
            .catch(e => {
                errorToast(e.response.data.reason)
            })
        // set buttons in normal state
        setDisableBtn(false)
    }

    return (
        <Box
            color='white'
            fontSize='22px'
            bgColor='#353535'
            w="100%"
            p='10px'
            borderRadius='8px'
            animation={(active == 'personal' ? startAnimation : '')}
        >
            <InputImage image={profileImage} setImage={setProfileImage} />
            <Flex
                mt="30px"
                justifyContent='space-between'
                alignItems='center'
            >
                <Box w="45%">
                    <FormInput label={"First name"} value={firstName} changeValue={changeFirstName} />
                </Box>
                <Box w="45%">
                    <FormInput label={"Last name"} value={lastName} changeValue={changeLastName} />
                </Box>
            </Flex>
            <FormInput mt='30px' label={"Email"} value={email} />
            <FormInput mt='30px' label={"Phone number"} value={phoneNumber} changeValue={changePhonenumber} type={'number'} />

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