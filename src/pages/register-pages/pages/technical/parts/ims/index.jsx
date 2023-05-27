import { Box, Radio, RadioGroup, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { BlackBox, PageContentWrapper, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useContext, useState } from 'react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import technicalContext from '../../context'
import AppDialog from 'components/common/dialog'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'hooks/toast/useToast'
import AppCard from 'components/common/card/AppCard'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'

function Ims() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [RadioGroupValue, setRadioGroup] = useState('')
    const { updateState, state: { imsType } } = useContext(technicalContext)
    const { showToast } = useAppToast()

    return (
        <AppCard>
            <VStack spacing={5} align='stretch'>
                <VStack align={"stretch"}>
                    <Box><FieldLabel label='IMS Type' textProps={{ size: "18px", weight: "bolder" }} isRequired /></Box>
                    <Box>
                        <AppTypography size="14px" color="#C2C2C2">
                            {imsType ? (
                                <>
                                    <AppTypography size='14px' weight='bolder' display={"inline"}>{capitalizeFirstLetter(imsType)}</AppTypography>: You can add and manage your products right from you droplinked dashboard
                                </>
                            ) : "Choose your Inventory Management System (IMS) to manage your products."}

                        </AppTypography>
                    </Box>
                </VStack>
                {!imsType && (
                    <RadioGroup
                        value={RadioGroupValue}
                        onChange={(value) => {
                            setRadioGroup(value)
                        }}
                    >
                        <VStack align='stretch' spacing={2}>
                            <Box>
                                <BlackBox padding={5}>
                                    <Radio size='md' value='DROPLINKED' alignItems="flex-start" colorScheme='green'>
                                        <VStack align='stretch' paddingLeft={2} spacing={2}>
                                            <TextLabelBold>Droplinked</TextLabelBold>
                                            <Text fontSize="sm" color="lightGray">
                                                You can add and manage your products right from you droplinked dashboard
                                            </Text>
                                        </VStack>
                                    </Radio>
                                </BlackBox>
                            </Box>
                            <Box>
                                <BlackBox padding={5}>
                                    <Radio size='md' value='SHOPIFY' alignItems="flex-start" colorScheme='green'>
                                        <VStack align='stretch' paddingLeft={2} spacing={2}>
                                            <TextLabelBold>Shopify</TextLabelBold>
                                            <Text fontSize="sm" color="lightGray">
                                                You can add and manage your products through shopify, and then import the changes to your droplinked store
                                            </Text>
                                        </VStack>
                                    </Radio>
                                </BlackBox>
                            </Box>
                            <Box dir='rtl'>
                                <BasicButton onClick={() => {
                                    if (!RadioGroupValue.length) return showToast("Please choose type", "error")
                                    onOpen()
                                }} sizes='medium'>Save</BasicButton>
                            </Box>
                        </VStack>
                    </RadioGroup>
                )}
            </VStack>

            <AppDialog
                open={isOpen}
                close={onClose}
                text={(
                    <>
                        Ones you have selected the IMS type, it cannot be changed.
                        Make sure this is the the method you want to use.</>
                )}
                title="Warning !"
                buttons={[
                    {
                        children: "Cancel",
                        onClick: () => setRadioGroup(''),
                        buttonProps: {
                            variant: "outline"
                        }
                    },
                    {
                        children: "Save",
                        onClick: () => updateState("imsType", RadioGroupValue)
                    }
                ]}
            />
        </AppCard>
    )
}

export default Ims