import { Flex, Button, Text } from '@chakra-ui/react'
import { useState } from 'react';
import InputImageComponent from '../../../../components/single-input-image-component/single-input-image-component'

export default function PersonalInfoComponent() {
    const profile = JSON.parse(localStorage.getItem("profile"));
   
    const [profileImage , setProfileImage] = useState(profile.avatar)
    console.log(profile)

    return (
        <Text
            color='white'
            fontSize='22px'
        >
            <InputImageComponent image={profileImage} setImage={setProfileImage} />
        </Text>
    )
}