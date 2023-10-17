import { Box, Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { designContext } from '../../design-context'
import classes from './style.module.scss'

function DesignPageDevices() {
    const { state: { device }, methods: { updateState } } = useContext(designContext)

    const items = [
        {
            key: "desktop",
            icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3.9375C0 2.3842 1.2592 1.125 2.8125 1.125H15.1875C16.7408 1.125 18 2.3842 18 3.9375V11.25C18 12.8033 16.7408 14.0625 15.1875 14.0625H12.695C12.5035 14.0625 12.361 14.2395 12.4019 14.4266L12.6388 15.5096C12.7923 16.2112 12.258 16.875 11.5398 16.875H6.4602C5.74201 16.875 5.20771 16.2112 5.36118 15.5096L5.59809 14.4266C5.63901 14.2395 5.49653 14.0625 5.30502 14.0625H2.8125C1.2592 14.0625 0 12.8033 0 11.25V3.9375ZM15.1875 2.8125H2.8125C2.19118 2.8125 1.6875 3.31618 1.6875 3.9375V11.25C1.6875 11.8713 2.19118 12.375 2.8125 12.375H6.04688H11.9531H15.1875C15.8088 12.375 16.3125 11.8713 16.3125 11.25V3.9375C16.3125 3.31618 15.8088 2.8125 15.1875 2.8125Z" fill="#C2C2C2" />
                </svg>
            )
        },
        {
            key: "mobile",
            icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.375 1.6875H5.625C5.00368 1.6875 4.5 2.19118 4.5 2.8125V15.1875C4.5 15.8088 5.00368 16.3125 5.625 16.3125H12.375C12.9963 16.3125 13.5 15.8088 13.5 15.1875V2.8125C13.5 2.19118 12.9963 1.6875 12.375 1.6875ZM5.625 0C4.0717 0 2.8125 1.2592 2.8125 2.8125V15.1875C2.8125 16.7408 4.0717 18 5.625 18H12.375C13.9283 18 15.1875 16.7408 15.1875 15.1875V2.8125C15.1875 1.2592 13.9283 0 12.375 0H5.625Z" fill="#C2C2C2" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 14.3438C6.75 13.8778 7.12776 13.5 7.59375 13.5H10.4062C10.8722 13.5 11.25 13.8778 11.25 14.3438C11.25 14.8097 10.8722 15.1875 10.4062 15.1875H7.59375C7.12776 15.1875 6.75 14.8097 6.75 14.3438Z" fill="#C2C2C2" />
                </svg>
            )
        }
    ]

    return (
        <Flex justifyContent="center" gap="48px">
            {items.map((el, key) => (
                <Box key={key} onClick={() => updateState('device', el.key)} className={device === el.key ? classes.active : ''} cursor="pointer">{el.icon}</Box>
            ))}
        </Flex>
    )
}

export default DesignPageDevices