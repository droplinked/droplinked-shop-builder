import { Box, Flex, HStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { PageContentWrapper } from 'pages/register-pages/RegisterPages-style'
import technicalContext from 'pages/register-pages/pages/technical/context'
import React, { useCallback, useContext } from 'react'
import classes from './style.module.scss'

interface Props {
  // title: string;
  chain: any;
  token?: any;
  // walletAddress: string;
}

function ContainerPayment({ chain, token }: Props) {
  // Check active
  // useEffect(() => { locked && setActive(true) }, [title, value, locked])

  const { state: { paymentMethods }, updateState } = useContext(technicalContext)
  // const [active, setActive] = useState(token?.isActive || chain.isActive)
  // const [Switch, setSwitch] = useState()
  const { showToast } = useAppToast()

  // const updatePayments = useCallback((key, value) => updatePayment(key, value, title), [title, updatePayment])

  // const activeMethod = useCallback((value?: boolean) => updatePayments("isActive", value), [updatePayments])

  // const save = useCallback(() => {
  //   if (title !== "STRIPE" && active && !value) return showToast({ message: "Please enter wallet", type: "error" })
  //   activeMethod(true)
  // }, [value, title, locked, active, showToast, activeMethod])

  const save = () => {

  }

  const handleActivation = (e: any) => {
    // const checked = e.target.checked
    // const selectedPaymentMethods = [...paymentMethods]
    // const targetChain = selectedPaymentMethods.find(payment => payment.type === chain.type)
    // if (["STRIPE", "COINBASE"].includes(chain.type)) {
    //   targetChain ?
    //     targetChain.isActive = checked :
    //     selectedPaymentMethods.push({ ...chain, isActive: checked })

    //   updateState("paymentMethods", selectedPaymentMethods)
    //   return
    // }

    // if (!token) {
    //   targetChain ?
    //     targetChain.isActive = checked :
    //     selectedPaymentMethods.push({ ...chain, isActive: checked })

    //   updateState("paymentMethods", selectedPaymentMethods)
    //   return
    // }

    // if (checked) {
    //   if (targetChain) {
    //     targetChain.isActive = true
    //     const targetToken = targetChain.tokens.find(currentToken => currentToken.type === token.type)
    //     targetToken ? token.isActive = true :
    //       targetChain.tokens.push({ ...token, isActive: true })
    //   }
    //   else {
    //     const newChain = { ...chain, isActive: true }
    //     selectedPaymentMethods.push(newChain)
    //   }
    // }
    // else {
    //   const targetToken = targetChain.tokens.find(currentToken => currentToken.type === token.type)
    //   targetToken.isActive = false
    //   targetChain.isActive = targetChain.tokens.some(token => token.isActive === true) ? true : false
    // }

    // updateState("paymentMethods", selectedPaymentMethods)
    const isChecked = e.target.checked
    const updatedPaymentMethods = [...paymentMethods]

    const findAndUpdateChain = (chain) => {
      const existingChainIndex = updatedPaymentMethods.findIndex(payment => payment.type === chain.type)

      if (existingChainIndex !== -1) {
        updatedPaymentMethods[existingChainIndex].isActive = isChecked
      } else {
        updatedPaymentMethods.push({ ...chain, isActive: isChecked })
      }
    }

    const findAndUpdateToken = (chain, token) => {
      const targetChain = updatedPaymentMethods.find(payment => payment.type === chain.type)

      if (!targetChain) {
        const newChain = { ...chain, isActive: true, tokens: [{ ...token, isActive: true }] }
        updatedPaymentMethods.push(newChain)
        return
      }

      targetChain.isActive = true

      const targetTokenIndex = targetChain.tokens.findIndex(currentToken => currentToken.type === token.type)

      if (isChecked) {
        if (targetTokenIndex !== -1) {
          targetChain.tokens[targetTokenIndex].isActive = true
        } else {
          targetChain.tokens.push({ ...token, isActive: true })
        }
      } else {
        if (targetTokenIndex !== -1) {
          targetChain.tokens[targetTokenIndex].isActive = false
        }
        targetChain.isActive = targetChain.tokens.some(token => token.isActive)
      }
    }

    if (["STRIPE", "COINBASE"].includes(chain.type) || !token) {
      findAndUpdateChain(chain)
    } else {
      findAndUpdateToken(chain, token)
    }

    updateState("paymentMethods", updatedPaymentMethods)
  }


  const edit = useCallback(() => {
    // activeMethod(false)
    // setSwitch(true)
  }, [])

  return (
    <HStack justifyContent="space-between" width="100%">
      <Flex alignItems={"center"} gap={4}>
        <AppSwitch isChecked={token?.isActive || chain.isActive} onChange={handleActivation} />
        <AppTypography fontSize="14px" color="#C2C2C2" fontWeight='bold'><BlockchainDisplay show='name' blockchain={token ? `${chain.type} (${token.type})` : chain.type} /></AppTypography>
      </Flex>
      {["STRIPE", "COINBASE"].includes(chain.type) ?
        <BlockchainDisplay show='icon' blockchain={chain.type} props={{ width: "32px", height: "32px" }} /> :
        (
          <HStack width={"60%"}>
            <PageContentWrapper padding={3} height="45px" display="flex" alignItems="center">
              <HStack width="100%" justifyContent="space-between" alignItems="center" padding="0">
                {token?.isActive || chain.isActive ? (
                  <Flex width={"100%"} gap={1}>
                    <BlockchainDisplay show='icon' blockchain={chain.type} props={{ width: "16px", height: "16px" }} />
                    <input type="text" style={{ flex: 1 }} className={classes.textbox} value={chain.destinationAddress} />
                    <Box onClick={edit} cursor={"pointer"}><AppIcons.EditIcon width="16px" height="16px" /></Box>
                  </Flex>
                ) : (
                  <>
                    <Box position={"relative"} width="100%" top={.9}>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        className={classes.textbox}
                        // readOnly={!Switch}
                        // onChange={(e) => updatePayments("destinationAddress", e.target.value)}
                        placeholder='Please enter wallet address.'
                        value={chain.destinationAddress}
                      />
                    </Box>
                    <BasicButton sizes='medium' minWidth={"50px"} onClick={save}>Save</BasicButton>
                  </>
                )}
              </HStack>
            </PageContentWrapper>
          </HStack>
        )
      }
    </HStack>
  )
}

export default ContainerPayment