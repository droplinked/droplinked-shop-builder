import { Box, Radio, RadioGroup, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { BlackBox, PageContentWrapper, StarLabel, Text18px, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useContext, useState } from 'react'
import BasicButton from 'common/BasicButton/BasicButton'
import technicalContext from '../../context'
import AppDialog from 'common/dialog'
import { useToasty } from 'context/toastify/ToastContext'
import FieldLabel from 'common/form/fieldLabel/FieldLabel'
import AppTypography from 'common/typography/AppTypography'

function Ims(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [RadioGroupValue, setRadioGroup] = useState('')
    const { errorToast } = useToasty()
    const { updateState, state: { imsType } } = useContext(technicalContext)

    return (
        <>
            <VStack
                spacing={2}
                align='stretch'
            >
                <Box>
                    <FieldLabel label='IMS Type' isRequired />
                </Box>
                <Box>
                    <AppTypography size="14px" color="#C2C2C2">
                        {imsType ? (
                            <>
                                <strong>{imsType}</strong>: You can add and manage your products right from you droplinked dashboard
                            </>
                        ) : "Choose your integrated management system to manage your products"}

                    </AppTypography>
                </Box>
                {!imsType && (
                    <BlackBox>
                        <RadioGroup
                            value={RadioGroupValue}
                            onChange={(value) => {
                                setRadioGroup(value)
                            }}
                        >
                            <VStack align='stretch' spacing={3}>
                                <Box>
                                    <PageContentWrapper padding={5}>
                                        <Radio size='md' value='DROPLINKED' alignItems="flex-start" colorScheme='green'>
                                            <VStack align='stretch' paddingLeft={2} spacing={2}>
                                                <TextLabelBold>Droplinked</TextLabelBold>
                                                <Text fontSize="sm" color="lightGray">
                                                    You can add and manage your products right from you droplinked dashboard
                                                </Text>
                                            </VStack>
                                        </Radio>
                                    </PageContentWrapper>
                                </Box>
                                <Box>
                                    <PageContentWrapper padding={5}>
                                        <Radio size='md' value='SHOPIFY' alignItems="flex-start" colorScheme='green'>
                                            <VStack align='stretch' paddingLeft={2} spacing={2}>
                                                <TextLabelBold>Shopify</TextLabelBold>
                                                <Text fontSize="sm" color="lightGray">
                                                    You can add and manage your products through shopify, and then import the changes to your droplinked store
                                                </Text>
                                            </VStack>
                                        </Radio>
                                    </PageContentWrapper>
                                </Box>
                                <Box dir='rtl'>
                                    <BasicButton onClick={() => {
                                        if (!RadioGroupValue.length) return errorToast("Please choose type")
                                        onOpen()
                                    }} sizes='medium'>Save</BasicButton>
                                </Box>
                            </VStack>
                        </RadioGroup>
                    </BlackBox>
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
        </>
    )
}

export default Ims