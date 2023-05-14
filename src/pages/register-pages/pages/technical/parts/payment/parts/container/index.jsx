import { Box, HStack, Image, Text } from '@chakra-ui/react'
import { PageContentWrapper, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useCallback, useContext } from 'react'
import classes from './style.module.scss'
import AppSwitch from 'components/shared/swich'
import editIcon from "assest/icon/edit-icon.svg";
import MetaMask from "assest/icon/MetaMask.svg";
import SaveIcon from "assest/icon/frame20783.svg";
import saveIconGreen from "assest/icon/saveIconGreen.svg";
import { toast } from 'react-toastify'
import technicalContext from 'pages/register-pages/pages/technical/context'

function ContainerPayment({ title, value, locked }) {
  const { updatePayment } = useContext(technicalContext)

  const lockHandle = useCallback((e) => {
    const check = e.target.checked
    if (title !== "STRIPE" && check && !value) return toast.error("Please enter wallet")
    updatePayments("isActive", !locked)
  }, [value, title, locked])

  const updatePayments = useCallback((key, value) => {
    updatePayment(key, value, title)
  }, [title])

  return (
    <HStack justifyContent="space-between">
      <HStack>
        <Box position={"relative"} bottom={1.9}><AppSwitch isChecked={locked} onChange={lockHandle} /></Box>
        <Box><TextLabelBold>{title}</TextLabelBold></Box>
      </HStack>
      {title !== "STRIPE" ? (
        <HStack>
          <PageContentWrapper padding={3}>
            <HStack alignItems="center" spacing={4}>
              {locked ? (
                <>
                  <Box><Image src={MetaMask} w="16px" h="16px" /></Box>
                  <Box position={"relative"} top={.9}>
                    <input type="text" className={classes.textbox} value={value} readOnly />
                  </Box>
                  <Box onClick={() => updatePayments("isActive", false)} cursor={"pointer"}><Image src={editIcon} w="16px" h="16px" /></Box>
                </>
              ) : (
                <>
                  <Box position={"relative"} top={.9}>
                    <input
                      type="text"
                      className={classes.textbox}
                      onChange={(e) => updatePayments("destinationAddress", e.target.value)}
                      placeholder='Target wallet pubic key'
                      value={value}
                    />
                  </Box>
                  <Box><Image src={value ? saveIconGreen : SaveIcon} w="16px" h="16px" /></Box>
                </>
              )}
            </HStack>
          </PageContentWrapper>
        </HStack>
      ) : null}
    </HStack>
  )
}

export default ContainerPayment