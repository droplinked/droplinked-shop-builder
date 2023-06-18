import { Box, HStack } from '@chakra-ui/react'
import { PageContentWrapper, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import classes from './style.module.scss'
import AppSwitch from 'components/common/swich'
import technicalContext from 'pages/register-pages/pages/technical/context'
import useAppToast from 'functions/hooks/toast/useToast'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'

function ContainerPayment({ title, value, locked }) {

  // Check active
  useEffect(() => locked && setActive(true), [title, value, locked])

  const { updatePayment } = useContext(technicalContext)
  const [active, setActive] = useState(false)
  const [Switch, setSwitch] = useState(locked)
  const { showToast } = useAppToast()

  const activeMethod = useCallback((value?: boolean) => updatePayments("isActive", value), [])

  const save = useCallback(() => {
    if (title !== "STRIPE" && active && !value) return showToast("Please enter wallet", "error")
    activeMethod(true)
  }, [value, title, locked, active])

  const activeHandle = useCallback((e: any) => {
    const checked = e.target.checked
    setSwitch(checked)
    if (title === "STRIPE") activeMethod(checked)
    if (!checked) activeMethod(false)
  }, [title])

  const updatePayments = useCallback((key, value) => updatePayment(key, value, title), [title])

  const getIcon = useCallback((icon: string) => {
    let styles = { width: "16px", height: "16px" }
    switch (icon) {
      case "CASPER":
        return <AppIcons.casperIcon style={styles} />
      case "NAER":
        return <AppIcons.nearWalletIcon style={styles} />
      case "STACKS":
        return <AppIcons.stacks style={styles} />
      case "STRIPE":
        return <AppIcons.stripe width="30px" height="30px" />

      default:
        return ""
    }
  }, [])

  const edit = useCallback(() => {
    activeMethod(false)
    setSwitch(true)
  }, [])


  return (
    <HStack justifyContent="space-between">
      <HStack>
        <Box position={"relative"} bottom={1.9}><AppSwitch isChecked={Switch} onChange={activeHandle} /></Box>
        <Box><TextLabelBold>{title}</TextLabelBold></Box>
      </HStack>
      {title !== "STRIPE" ? (
        <HStack>
          <PageContentWrapper padding={3}>
            <HStack alignItems="center" spacing={4}>
              {locked ? (
                <>
                  <Box>{getIcon(title)}</Box>
                  <Box position={"relative"} top={.9}>
                    <input type="text" className={classes.textbox} value={value} readOnly />
                  </Box>
                  <Box onClick={edit} cursor={"pointer"}><AppIcons.editIcon width="16px" height="16px" /></Box>
                </>
              ) : (
                <>
                  <Box position={"relative"} top={.9}>
                    <input
                      type="text"
                      className={classes.textbox}
                      readOnly={!Switch}
                      onChange={(e) => updatePayments("destinationAddress", e.target.value)}
                      placeholder='Target wallet public key'
                      value={value}
                    />
                  </Box>
                  <Box><BasicButton sizes='medium' minWidth={"50px"} disabled={!Switch} onClick={save}>Save</BasicButton></Box>
                </>
              )}
            </HStack>
          </PageContentWrapper>
        </HStack>
      ) : Switch ? <Box>{getIcon("STRIPE")}</Box> : null}
    </HStack>
  )
}

export default ContainerPayment