import { Box, Flex, HStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import useShopPermissionsStore from 'lib/stores/app/shopPermissionsStore'
import { PageContentWrapper } from 'pages/register-pages/RegisterPages-style'
import technicalContext from 'pages/register-pages/pages/technical/context'
import React, { useContext, useEffect, useState } from 'react'
import classes from './style.module.scss'
import AppErrors from 'lib/utils/statics/errors/errors'

function ContainerPayment({ chain, token }: { chain: any, token?: any }) {
  const getPermissionValue = useShopPermissionsStore(state => state.getPermissionValue)
  const { state: { paymentMethods }, updateState } = useContext(technicalContext)
  const selectedPaymentMethods = [...paymentMethods]
  const { showToast } = useAppToast()
  const [walletAddress, setWalletAddress] = useState<string>(chain.destinationAddress)
  const [canEditWallet, setWalletEditability] = useState(!!chain.destinationAddress) // If the 'chain' object has an 'destinationAddress' property, we can edit it

  const persistWalletAddress = () => {
    const newWalletAddress = walletAddress.trim()
    const selectedPaymentMethods = [...paymentMethods]
    const targetPaymentMethod = selectedPaymentMethods.find(payment => payment.type === chain.type)
    if (targetPaymentMethod) {
      targetPaymentMethod.destinationAddress = newWalletAddress
      if (!newWalletAddress) {
        targetPaymentMethod.isActive = false
        targetPaymentMethod.tokens.forEach(token => token.isActive = false)
      }
    }
    else {
      const newPaymentMethod = { ...chain, destinationAddress: newWalletAddress }
      if (!newWalletAddress) {
        targetPaymentMethod.isActive = false
        targetPaymentMethod.tokens.forEach(token => token.isActive = false)
      }
      selectedPaymentMethods.push(newPaymentMethod)
    }
    updateState("paymentMethods", selectedPaymentMethods)
    setWalletEditability(true)
  }

  const canActivateNewPaymentMethod = (): boolean => {
    const maxActivePaymentMethodCount = getPermissionValue("web3_payment")
    if (maxActivePaymentMethodCount === "Unlimited") return true

    const activePaymentMethods = selectedPaymentMethods
      .filter(payment => payment.isActive || payment.type !== "STRIPE") //We filter stripe because it's not a web3 payment method
      .reduce((count, payment) => {
        if (payment.type === "COINBASE") return count + (payment.isActive ? 1 : 0)
        return count + payment.tokens.filter(token => token.isActive).length
      },
        0
      )

    if (activePaymentMethods < +maxActivePaymentMethodCount) return true

    showToast({ message: AppErrors.permission.maxActivePaymentMethods(maxActivePaymentMethodCount), type: "error" })
    return false
  }

  const findAndUpdateChain = (isChecked: boolean) => {
    const existingChainIndex = selectedPaymentMethods.findIndex(payment => payment.type === chain.type)
    if (isChecked) {
      if (!canActivateNewPaymentMethod()) return
      existingChainIndex !== -1 ?
        selectedPaymentMethods[existingChainIndex].isActive = true :
        selectedPaymentMethods.push({ ...chain, isActive: true })
    }
    else {
      const activePaymentMethodsCount = selectedPaymentMethods.filter(payment => payment.isActive).length
      if (activePaymentMethodsCount === 1) return
      selectedPaymentMethods[existingChainIndex].isActive = false
    }
  }

  const findAndUpdateToken = (isChecked: boolean) => {
    const targetChain = selectedPaymentMethods.find(payment => payment.type === chain.type)

    if (!targetChain) {
      const newChain = { ...chain, isActive: true, tokens: [{ ...token, isActive: true }] }
      selectedPaymentMethods.push(newChain)
      return
    }

    targetChain.isActive = true
    const targetTokenIndex = targetChain.tokens.findIndex(currentToken => currentToken.type === token.type)

    if (isChecked) {
      if (!canActivateNewPaymentMethod()) return
      targetTokenIndex !== -1 ?
        targetChain.tokens[targetTokenIndex].isActive = true :
        targetChain.tokens.push({ ...token, isActive: true })
    } else {
      const activePaymentMethods = selectedPaymentMethods.filter(payment => payment.isActive)
      if (activePaymentMethods.length === 1 && activePaymentMethods[0].tokens.filter(token => token.isActive).length === 1) return
      if (targetTokenIndex !== -1) {
        targetChain.tokens[targetTokenIndex].isActive = false
      }
      targetChain.isActive = targetChain.tokens.some(token => token.isActive)
    }
  }

  const handleActivation = (e) => {
    if (!["STRIPE", "COINBASE"].includes(chain.type) && !chain.destinationAddress) return showToast({ type: "info", message: "Please enter your wallet address first" })
    const isChecked = e.target.checked
    if (["STRIPE", "COINBASE"].includes(chain.type) || !token) findAndUpdateChain(isChecked)
    else findAndUpdateToken(isChecked)
    updateState("paymentMethods", selectedPaymentMethods)
  }

  // whenever we change wallet address, it should also be updated in other chain-token pairs (because we store wallet address in state)
  useEffect(() => {
    const walletAddress = chain.destinationAddress
    setWalletAddress(walletAddress)
    setWalletEditability(!!walletAddress)
  }, [chain.destinationAddress])

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
                  type="text"
                  className={classes.textbox}
                  placeholder='Please enter wallet address'
                  spellCheck={false}
                  disabled={canEditWallet}
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
                {canEditWallet && <Box onClick={() => setWalletEditability(false)}><AppIcons.EditIcon width="16px" height="16px" cursor={"pointer"} /></Box>}
                {!canEditWallet && <BasicButton minWidth={"48px"} sizes='medium' onClick={persistWalletAddress}>Save</BasicButton>}
              </Flex>
            </PageContentWrapper>
          </HStack>
        )
      }
    </Flex>
  )
}

export default ContainerPayment