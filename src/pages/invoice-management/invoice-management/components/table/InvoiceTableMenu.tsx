import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'

function InvoiceTableMenu({ invoiceId }) {
    return (
        <Menu>
            <MenuButton as={"button"}><AppIcons.Dots /></MenuButton>
            <MenuList
                width={"144px !important"}
                border={"1px solid #292929"}
                borderRadius={8}
                padding={0}
                overflow={"hidden"}
                bgColor={"#1C1C1C"}
                sx={{
                    "button": {
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        px: 4,
                        py: 3,
                        fontSize: 16,
                        fontWeight: 500,
                        bgColor: "inherit",
                        borderBottom: "inherit",
                        _last: { borderBottom: "none" }
                    }
                }}
            >
                <MenuItem>
                    <AppIcons.Edit />
                    Edit
                </MenuItem>
                <MenuItem color={"#FF2244"}>
                    <AppIcons.RedTrash />
                    Delete
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default InvoiceTableMenu