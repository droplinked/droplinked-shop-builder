import { switchAnatomy } from '@chakra-ui/anatomy'
import { Switch, createMultiStyleConfigHelpers, extendTheme } from '@chakra-ui/react'
import React from 'react'
import classes from './style.module.scss'

function AppSwitch({...args}) {

    return (
        <Switch  {...args} size='md' className={classes.switch} colorScheme='green'  />
    )
}

export default AppSwitch