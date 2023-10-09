import { Box, HStack } from '@chakra-ui/react'
import { PageContentWrapper, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import classes from './style.module.scss'
import AppSwitch from 'components/common/swich'
import technicalContext from 'pages/register-pages/pages/technical/context'
import useAppToast from 'functions/hooks/toast/useToast'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'

function ContainerPayment({ title, value, locked }) {

  // Check active
  useEffect(() => locked && setActive(true), [title, value, locked])

  const { updatePayment } = useContext(technicalContext)
  const [active, setActive] = useState(false)
  const [Switch, setSwitch] = useState(locked)
  const { showToast } = useAppToast()

  const updatePayments = useCallback((key, value) => updatePayment(key, value, title), [title, updatePayment])

  const activeMethod = useCallback((value?: boolean) => updatePayments("isActive", value), [updatePayments])

  const save = useCallback(() => {
    if (title !== "STRIPE" && active && !value) return showToast("Please enter wallet", "error")
    activeMethod(true)
  }, [value, title, locked, active, showToast, activeMethod])

  const activeHandle = useCallback((e: any) => {
    const checked = e.target.checked
    setSwitch(checked)
    if (title === "STRIPE") activeMethod(checked)
    if (!checked) activeMethod(false)
  }, [title])


  const getIcon = useCallback((icon: string) => {
    let styles = { width: "16px", height: "16px" }

    switch (icon) {
      case "CASPER":
        return <AppIcons.CasperIcon style={styles} />
      case "NEAR":
        return <AppIcons.NearWalletIcon style={styles} />
      case "STACKS":
        return <AppIcons.Stacks style={styles} />
      case "STRIPE":
        return <AppIcons.Stripe width="30px" height="30px" />

      default:
        return ""
    }
  }, [])

  const edit = useCallback(() => {
    activeMethod(false)
    setSwitch(true)
  }, [])


  return (
    <HStack justifyContent="space-between" width="100%">
      <HStack spacing="18px">
        <Box position={"relative"} bottom={1.9}><AppSwitch isChecked={Switch} onChange={activeHandle} /></Box>
        <Box><AppTypography size="14px" color="#C2C2C2" weight='bolder'>{title}</AppTypography></Box>
      </HStack>
      {title !== "STRIPE" ? (
        <HStack width={"60%"}>
          <PageContentWrapper padding={3} height="45px" display="flex" alignItems="center">
            <HStack alignItems="center" padding="0" justifyContent="space-between" width="100%">
              {locked ? (
                <>
                  <Box>{getIcon(title)}</Box>
                  <Box position={"relative"} width="100%" top={.9}>
                    <input type="text" style={{ width: "100%" }} className={classes.textbox} value={value} readOnly />
                  </Box>
                  <Box onClick={edit} cursor={"pointer"}><AppIcons.EditIcon width="16px" height="16px" /></Box>
                </>
              ) : (
                <>
                  <Box position={"relative"} width="100%" top={.9}>
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      className={classes.textbox}
                      readOnly={!Switch}
                      onChange={(e) => updatePayments("destinationAddress", e.target.value)}
                      placeholder='Please enter wallet address.'
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