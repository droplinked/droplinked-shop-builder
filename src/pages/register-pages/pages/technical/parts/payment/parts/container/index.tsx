import { Box, Flex, HStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { PageContentWrapper } from 'pages/register-pages/RegisterPages-style'
import technicalContext from 'pages/register-pages/pages/technical/context'
import React, { useContext, useState } from 'react'
import classes from './style.module.scss'

function ContainerPayment({ chain, token }: { chain: any, token?: any }) {
  const { state: { paymentMethods }, updateState } = useContext(technicalContext)
  const [walletAddress, setWalletAddress] = useState(chain.destinationAddress)
  const [canEditWallet, setWalletEditability] = useState(!!walletAddress) // If the 'chain' object has an 'destinationAddress' property, we can edit it

  const persistWalletAddress = () => {
    const updatedPaymentMethods = [...paymentMethods]
    const existingChainIndex = updatedPaymentMethods.findIndex(payment => payment.type === chain.type)
    if (existingChainIndex !== -1) {
      updatedPaymentMethods[existingChainIndex].destinationAddress = walletAddress
    }
    else updatedPaymentMethods.push({ ...chain, destinationAddress: walletAddress })
    updateState("paymentMethods", updatedPaymentMethods)
    setWalletEditability(true)
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

  return (
    <Flex justifyContent="space-between" width="100%">
      <Flex alignItems={"center"} gap={4}>
        <AppSwitch isChecked={token?.isActive || chain.isActive} onChange={handleActivation} />
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