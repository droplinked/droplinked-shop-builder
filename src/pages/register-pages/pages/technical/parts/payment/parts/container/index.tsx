import { Box, Flex, HStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { PageContentWrapper } from 'pages/register-pages/RegisterPages-style'
import technicalContext from 'pages/register-pages/pages/technical/context'
import React, { useContext, useRef, useState } from 'react'
import classes from './style.module.scss'
import useAppToast from 'functions/hooks/toast/useToast'

function ContainerPayment({ chain, token }: { chain: any, token?: any }) {
  const { showToast } = useAppToast()
  const { state: { paymentMethods }, updateState } = useContext(technicalContext)
  const walletAddressInputRef = useRef<HTMLInputElement>(null)
  const [canEditWallet, setWalletEditability] = useState(!!chain.destinationAddress) // If the 'chain' object has an 'destinationAddress' property, we can edit it

  const persistWalletAddress = () => {
    const newWalletAddress = walletAddressInputRef.current.value.trim()
    const updatedPaymentMethods = [...paymentMethods]
    const existingChainIndex = updatedPaymentMethods.findIndex(payment => payment.type === chain.type)
    if (existingChainIndex !== -1) {
      updatedPaymentMethods[existingChainIndex].destinationAddress = newWalletAddress
      if (!newWalletAddress) updatedPaymentMethods[existingChainIndex].isActive = false
    }
    else updatedPaymentMethods.push({ ...chain, destinationAddress: newWalletAddress })
    updateState("paymentMethods", updatedPaymentMethods)
  }

  const handleActivation = (e) => {
    if (!["STRIPE", "COINBASE"].includes(chain.type) && !chain.destinationAddress) return showToast({ type: "info", message: "Please enter your wallet address first" })
    const isChecked = e.target.checked
    const updatedPaymentMethods = [...paymentMethods]

    const findAndUpdateChain = () => {
      const existingChainIndex = updatedPaymentMethods.findIndex(payment => payment.type === chain.type)
      if (isChecked) {
        if (existingChainIndex !== -1) {
          updatedPaymentMethods[existingChainIndex].isActive = true
        } else {
          updatedPaymentMethods.push({ ...chain, isActive: true })
        }
      }
      else {
        const activePaymentMethodsCount = updatedPaymentMethods.filter(payment => payment.isActive).length
        if (activePaymentMethodsCount === 1) return
        updatedPaymentMethods[existingChainIndex].isActive = false
      }
    }

    const findAndUpdateToken = () => {
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
        const activePaymentMethodsCount = updatedPaymentMethods.filter(payment => payment.isActive).length
        console.log("token dar chain truw", updatedPaymentMethods.filter(payment => payment.isActive))
        if (activePaymentMethodsCount === 1) return
        if (targetTokenIndex !== -1) {
          targetChain.tokens[targetTokenIndex].isActive = false
        }
        targetChain.isActive = targetChain.tokens.some(token => token.isActive)
      }
    }

    if (["STRIPE", "COINBASE"].includes(chain.type) || !token) {
      findAndUpdateChain()
    } else {
      findAndUpdateToken()
    }

    updateState("paymentMethods", updatedPaymentMethods)
  }

  return (
    <Flex justifyContent="space-between" width="100%">
      <Flex alignItems={"center"} gap={4}>
        <AppSwitch isChecked={token ? chain.isActive && token.isActive : chain.isActive} onChange={handleActivation} />
        <AppTypography fontSize="14px" color="#C2C2C2" fontWeight='bold'><BlockchainDisplay show='name' blockchain={token ? `${chain.type} (${token.type})` : chain.type} /></AppTypography>
      </Flex>
      {["STRIPE", "COINBASE"].includes(chain.type) ?
        <BlockchainDisplay show='icon' blockchain={chain.type} props={{ width: "32px", height: "32px" }} /> :
        (
          <HStack width={"60%"}>
            <PageContentWrapper padding={3} height="45px" display="flex" alignItems="center">
              <Flex width={"100%"} gap={4}>
                <input
                  ref={walletAddressInputRef}
                  type="text"
                  className={classes.textbox}
                  placeholder='Please enter wallet address'
                  spellCheck={false}
                  disabled={canEditWallet}
                  value={chain.destinationAddress}
                  onChange={persistWalletAddress}
                />
                {canEditWallet && <Box onClick={() => setWalletEditability(false)}><AppIcons.EditIcon width="16px" height="16px" cursor={"pointer"} /></Box>}
                {!canEditWallet && <BasicButton minWidth={"48px"} sizes='medium' onClick={() => setWalletEditability(true)}>Save</BasicButton>}
              </Flex>
            </PageContentWrapper>
          </HStack>
        )
      }
    </Flex>
  )
}

export default ContainerPayment