import React from 'react'
import { Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'

interface Iprops {
  items: Array<{
    caption: string
    onClick: Function
  }>
}

function PopOverMenu({ items }: Iprops) {
  return (
    <Menu matchWidth placement='left-start'>
      <MenuButton width="10px" position={"relative"} top={1}>
        <AppIcons.MoreIcon width="15px" />
      </MenuButton>
      <MenuList minWidth={"auto"} backgroundColor={"#292929"} border="none">
        {items.map((el, key) => (
          <MenuItem key={key} onClick={() => el.onClick()} background={"none !important"}>
            <Text fontSize="sm">{el.caption}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default PopOverMenu