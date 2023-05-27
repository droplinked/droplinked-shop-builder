import { Box, HStack } from '@chakra-ui/react'
import { PageContentWrapper, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import classes from './style.module.scss'
import AppSwitch from 'components/common/swich'
import technicalContext from 'pages/register-pages/pages/technical/context'
import useAppToast from 'hooks/toast/useToast'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'

function ContainerPayment({ title, value, locked }) {
  
  // Check active
  useEffect(() => locked && setActive(true), [title, value, locked])

  const { updatePayment } = useContext(technicalContext)
  const [active, setActive] = useState(false)
  const { showToast } = useAppToast()

  const activeMethod = useCallback((value?: boolean) => updatePayments("isActive", value || !locked), [locked])

  const save = useCallback(() => {
    if (title !== "STRIPE" && active && !value) return showToast("Please enter wallet", "error")
    activeMethod()
  }, [value, title, locked, active])

  const activeHandle = useCallback((e: any) => {
    const checked = e.target.checked
    if (title === "STRIPE") activeMethod(checked)
    else if (!checked) activeMethod(false)
    setActive(checked)
  }, [active, title])

  const updatePayments = useCallback((key, value) => updatePayment(key, value, title), [title])

  return (
    <HStack justifyContent="space-between">
      <HStack>
        <Box position={"relative"} bottom={1.9}><AppSwitch isChecked={active} onChange={activeHandle} /></Box>
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
                      readOnly={!active}
                      onChange={(e) => updatePayments("destinationAddress", e.target.value)}
                      placeholder='Target wallet pubic key'
                      value={value}
                    />
                  </Box>
                  <Box><BasicButton sizes='medium' minWidth={"50px"} disabled={!active} onClick={save}>Save</BasicButton></Box>
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