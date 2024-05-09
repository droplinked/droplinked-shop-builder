import { Box, Flex, Link } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppInput from 'components/common/form/textbox/AppInput';
import AppModal from 'components/common/modal/AppModal';
import AppTypography from 'components/common/typography/AppTypography';
import useAppToast from 'functions/hooks/toast/useToast';
import { createCustomShippingService } from 'lib/apis/custom-shipping/CustomShippingServices';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import FileUpload from '../file-upload/FileUpload';

interface Props {
    isOpen: boolean;
    close: () => void;
    refetchCustomShippings
}

function CreateCustomShippingModal({ isOpen, close, refetchCustomShippings }: Props) {
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState(null)
    const { isLoading, mutateAsync } = useMutation((data: any) => createCustomShippingService(data))
    const { showToast } = useAppToast()

    const handleSubmit = async () => {
        try {
            if (!title || !details) return
            const data = { title, ...details }
            await mutateAsync(data)
            showToast({ type: "success", message: "A new custom shipping has been added." })
            close()
            refetchCustomShippings()
        }
        catch (e) {
            showToast({ type: "error", message: (e as Error).message })
        }
    }

    return (
        <AppModal open={isOpen} close={close} title='Custom Shipping' size="2xl" isCentered={true}>
            <Flex direction={"column"} gap={9}>
                <AppInput
                    name='title'
                    label='Title'
                    placeholder='What do you call your custom shipping?'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Flex direction={"column"} gap={3}>
                    {/* file input */}
                    <FileUpload label='Shipping File' setExcelData={(data: any) => setDetails(data)} />

                    {/* yellow box */}
                    <Flex alignItems={"center"} gap={2} borderRadius={8} padding={4} backgroundColor={"#FFD951"}>
                        <AppIcons.BlackInformation />
                        <AppTypography fontSize={14}>
                            <Link
                                href='https://upload-file-flatlay.s3.us-west-2.amazonaws.com/622e15c810c2e7fb08c93b7ffa185228feb223ea821a3a596dfdd64c63854597_or.xlsx'
                                textDecoration={"underline"}
                                fontWeight={600}
                                cursor={"pointer"}
                                download={"Droplinked-Shipping-Template.xlsx"}
                            >
                                Download our template</Link> {" "}
                            to ensure correct file format and details.
                        </AppTypography>
                    </Flex>
                </Flex>

                {/* buttons */}
                <Flex justifyContent={"space-between"}>
                    <BasicButton variant='outline' onClick={close}>Discard</BasicButton>
                    <BasicButton
                        onClick={handleSubmit}
                        isDisabled={!title || !details || isLoading}
                        isLoading={isLoading}
                    >
                        Add Shipping Method
                    </BasicButton>
                </Flex>
            </Flex>
        </AppModal >
    )
}

export default CreateCustomShippingModal