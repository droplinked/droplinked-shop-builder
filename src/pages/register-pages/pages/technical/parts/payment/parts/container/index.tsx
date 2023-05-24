import { Box, HStack } from '@chakra-ui/react'
import { PageContentWrapper, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useCallback, useContext } from 'react'
import classes from './style.module.scss'
import AppSwitch from 'common/swich'
import technicalContext from 'pages/register-pages/pages/technical/context'
import useAppToast from 'hooks/toast/useToast'
import AppIcons from 'assest/icon/Appicons'

function ContainerPayment({ title, value, locked }) {
  const { updatePayment } = useContext(technicalContext)
  const { showToast } = useAppToast()

  const lockHandle = useCallback((e: any) => {
    const check = e.target.checked
    if (title !== "STRIPE" && check && !value) return showToast("Please enter wallet", "error")
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
                  <Box><AppIcons.metaMaskIcon width="16px" height="16px" /></Box>
                  <Box position={"relative"} top={.9}>
                    <input type="text" className={classes.textbox} value={value} readOnly />
                  </Box>
                  <Box onClick={() => updatePayments("isActive", false)} cursor={"pointer"}><AppIcons.editIcon width="16px" height="16px" /></Box>
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
                  <Box><AppIcons.saveIcon className={value ? classes.active : ""} width="16px" height="16px" /></Box>
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