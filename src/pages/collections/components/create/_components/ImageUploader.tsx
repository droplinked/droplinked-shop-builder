import { Box, Flex, HStack, Image, VStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import ErrorLabel from '../../controls/components/rulesets/components/labels/errorLabel/errorLabel';
import AppUploadImage from 'components/redesign/image/AppUploadImage';
import * as React from 'react';
import { IFileData } from '../interface/interfaces';
import { FormikErrors, FormikValues } from 'formik';

interface ImageUploaderProps {
    errors: FormikErrors<{ image?: string }>;
    values: FormikValues;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

function ImageUploader({ errors, values, setFieldValue }: ImageUploaderProps) {
    const [fileData, setFileData] = React.useState<IFileData>();

    return (
        <VStack width="100%">
            <Flex width={"100%"} direction="column" gap={"16px"}>
                <AppTypography fontSize={"16px"} fontWeight={500}>Collection Cover</AppTypography>
                <AppUploadImage setFileData={(data: IFileData) => setFileData(data)} onChange={(image: string) => setFieldValue('image', image)} values={values.image} size='original' accept={{ "image/png": [".png", ".jpeg", ".jpg"] }} />
                {errors.image && <ErrorLabel message={errors.image} />}
            </Flex>
            {values.image &&
                <HStack border={"1px solid #292929"} p={"12px"} borderRadius={"8px"} mt={"16px"} width={"100%"} justifyContent={"space-between"}>
                    <Flex gap="16px" alignItems={"center"}>
                        <Image height="56px" width="56px" src={values.image} objectFit="cover" borderRadius="4px" bgColor="black" />
                        <VStack alignItems={"start"}>
                            <AppTypography>{fileData?.title?.substring(0, 30) ?? "Collection_Image"}...</AppTypography>
                            {fileData?.size && <AppTypography color={"#7B7B7B"} fontSize={"12px"}>{fileData?.size}</AppTypography>}
                        </VStack>
                    </Flex>
                    <Box onClick={() => setFieldValue('image', '')} cursor={"pointer"}>
                        <AppIcons.TrashRed />
                    </Box>
                </HStack>
            }
        </VStack>
    );
}

export default ImageUploader;