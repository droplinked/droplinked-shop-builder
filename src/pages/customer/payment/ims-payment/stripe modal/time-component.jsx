
import {
    Flex,
    Text,
} from '@chakra-ui/react'
import { useState } from 'react';

const Timer = ({ timerSecond }) => {

    const [second , setSecond] = useState(timerSecond)

    setTimeout(()=>{setSecond(second-1)}, 1000);

    const getTime = () => {
        let minute = parseInt(second/60);
        let sec = parseInt(second%60);
        if(sec<10)
        return `0${minute}:0${sec}`
        else
        return `0${minute}:${sec}`
    }

    return (
        <Flex w='100%' justifyContent='center' >
            <Text
            color='#fff'
            fontSize={{base:'18px' , md:"22px"}}
            fontWeight='600'
            >{getTime()}</Text>
        </Flex>
    )
}

export default Timer