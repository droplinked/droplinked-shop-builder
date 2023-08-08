import { switchAnatomy } from '@chakra-ui/anatomy'
import { Switch, SwitchProps } from '@chakra-ui/react'
import React from 'react'
import classes from './style.module.scss'

interface IProps extends SwitchProps { }

function AppSwitch(props: IProps) {

    return (
        <Switch {...props} size='md' className={classes.switch} colorScheme='green' />
    )
}

export default AppSwitch