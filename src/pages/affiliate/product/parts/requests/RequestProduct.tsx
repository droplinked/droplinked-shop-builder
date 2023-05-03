import { Box, HStack, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import AppTable from 'components/shared/table/AppTable'
import React from 'react'
import moreIcon from 'assest/icon/more-icon.svg'
import ModalRequest from './parts/modalRequest/ModalRequest'
import PopOverMenu from 'components/shared/PopoverMenu/PopOverMenu'

function RequestProduct() {
    const modalRequest = useDisclosure()

    return (
        <>
            <AppTable
                rows={[
                    {
                        Size: {
                            value: faker.commerce.productMaterial()
                        },
                        Color: {
                            value: faker.color.human()
                        },
                        Inventory: {
                            value: faker.random.numeric()
                        },
                        Button: {
                            caption: "",
                            props: {
                                width: "200px"
                            },
                            value: (
                                <HStack gap={2}>
                                    <Box><BasicButton onClick={modalRequest.onOpen}>Request</BasicButton></Box>
                                    <Box>
                                        <PopOverMenu items={[
                                            {
                                                caption: "view details",
                                                onClick: () => { }
                                            }
                                        ]} />
                                    </Box>
                                </HStack>
                            )
                        }
                    }
                ]}
            />
            <ModalRequest open={modalRequest.isOpen} close={modalRequest.onClose} />
            {/* <RequestDetail /> */}
        </>
    )
}

export default RequestProduct