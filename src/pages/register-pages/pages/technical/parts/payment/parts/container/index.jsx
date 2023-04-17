import { Box, HStack, Image, Text } from '@chakra-ui/react'
import { PageContentWrapper, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useCallback, useEffect, useState } from 'react'
import classes from './style.module.scss'
import AppSwitch from 'components/shared/swich'
import editIcon from "assest/icon/edit-icon.svg";
import MetaMask from "assest/icon/MetaMask.svg";
import SaveIcon from "assest/icon/frame20783.svg";
import saveIconGreen from "assest/icon/saveIconGreen.svg";
import { toast } from 'react-toastify'

function ContainerPayment({ title, value, locked }) {
  const [State, setState] = useState({
    lock: false,
    value: null
  })

  const updateState = useCallback((key, value) => {
    setState(prev => ({ ...prev, [key]: value }))
  }, [])

  const lockHandle = useCallback((e) => {
    const check = e.target.checked
    if (check && !State.value) return toast.error("Please enter wallet")
    updateState("lock", check)
  }, [State])

  useEffect(() => {
    if (locked) updateState("lock", locked)
    if (value) updateState("value", value)
  }, [locked,value])

  return (
    <HStack justifyContent="space-between">
      <HStack>
        <Box position={"relative"} bottom={1.9}><AppSwitch isChecked={State.lock} onChange={lockHandle} /></Box>
        <Box><TextLabelBold>{title}</TextLabelBold></Box>
      </HStack>
      <HStack>
        <PageContentWrapper padding={3}>
          <HStack alignItems="center" spacing={4}>
            {State.lock ? (
              <>
                <Box><Image src={MetaMask} w="16px" h="16px" /></Box>
                <Box position={"relative"} top={.9}>
                  <Text fontSize="sm" color="lightGray">
                    {State.value}
                  </Text>
                </Box>
                <Box onClick={() => updateState("lock", false)} cursor={"pointer"}><Image src={editIcon} w="16px" h="16px" /></Box>
              </>
            ) : (
              <>
                <Box position={"relative"} top={.9}>
                  <input
                    type="text"
                    className={classes.textbox}
                    onChange={(e) => updateState("value", e.target.value)}
                    placeholder='Target wallet pubic key'
                    value={State.value}
                  />
                </Box>
                <Box><Image src={State.value ? saveIconGreen : SaveIcon} w="16px" h="16px" /></Box>
              </>
            )}
          </HStack>
        </PageContentWrapper>
      </HStack>
    </HStack>
  )
}

export default ContainerPayment