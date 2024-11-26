import { Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React, { ReactElement } from 'react'

interface Iprops {
  items: Array<{
    caption: string
    onClick: Function
    icon?: ReactElement;
    color?: string;
  }>
}

function PopOverMenu({ items }: Iprops) {
  return (
    <Menu placement='left-start'>
      <MenuButton as={AppIcons.MoreIcon} width="15px" position={"relative"} top={1} />
      <MenuList borderRadius={"8px"} zIndex={"1000"} minWidth={"auto"} backgroundColor={"#141414"} border="none">
        {items.map((el, key) => (
          <MenuItem
            width={"146px"}
            height={"48px"}
            padding={"14px 16px"}
            iconSpacing={"8px"}
            icon={el.icon}
            key={key}
            onClick={() => el.onClick()}
            {...key !== 0 && { borderTop: "1px solid #292929" }}
            background={"none !important"}
          >
            <Text {...(el.color && { color: el.color })} fontSize="sm" fontWeight={"500"}>
              {el.caption}
            </Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default PopOverMenu