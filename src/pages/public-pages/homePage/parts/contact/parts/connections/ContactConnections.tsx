import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import vector1 from 'assest/image/homepage/lines/Vector1.svg'
import vector2 from 'assest/image/homepage/lines/Vector2.svg'
import vector3 from 'assest/image/homepage/lines/Vector3.svg'
import vector4 from 'assest/image/homepage/lines/Vector4.svg'
import vector5 from 'assest/image/homepage/lines/Vector5.svg'
import vector6 from 'assest/image/homepage/lines/Vector6.svg'
import vector7 from 'assest/image/homepage/lines/Vector7.svg'
import classes from './style.module.scss'

function ContactConnections() {
    return (
        <Box transform={{ base: 'scale(.5)', sm: 'scale(.6)', xl: 'scale(1)' }}>
            <Box position="absolute" textAlign="center" height="200px" width="600px" top="50%" left="50%" transform="translate(-70%, -50%)">
                <Image src={vector1} height="62.5%" position="absolute" top="-29%" left="35.7%" className={classes.ef1} />
                <Image src={vector2} height="60%" position="absolute" top="-29%" left="49.3%" className={classes.ef2} />
                <Image src={vector3} height="66%" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
                <Image src={vector4} height="42%" position="absolute" top="68.7%" left="21.5%" className={classes.ef3} />
                <Image src={vector5} height="45%" position="absolute" top="16.7%" left="64.9%" className={classes.ef4} />
                <Image src={vector6} height="46%" position="absolute" top="15.3%" left="74.6%" className={classes.ef5} />
                <Image src={vector7} height="65%" position="absolute" top="16.1%" left="84.1%" className={classes.ef6} />
            </Box>
        </Box>
    )
}

export default ContactConnections