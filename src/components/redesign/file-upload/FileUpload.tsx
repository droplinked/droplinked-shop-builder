import { Box, Flex, FlexProps, Spinner, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import React, { ReactNode } from "react";
import { useDropzone } from "react-dropzone";

interface IProps {
    onFileChange: (file: File) => void;
    dropDescription?: string;
    multiple?: boolean;
    accept?: {
        [key: string]: string[];
    };
    isLoading?: boolean;
    boxProps?: FlexProps;
    icon?: ReactNode;
    title?: ReactNode
}

function FileUpload({
    onFileChange,
    dropDescription,
    multiple = false,
    accept,
    isLoading = false,
    boxProps = {},
    icon,
    title
}: IProps) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            const selectedFile = acceptedFiles[0];
            onFileChange(selectedFile);
        },
        disabled: isLoading,
        multiple: multiple,
        accept: accept,
    });

    const dropMessage = isDragActive ? (
        <AppTypography fontSize={14} color="#fff">
            Drop the file here ...
        </AppTypography>
    ) : (
        <>
            {title ? title :
                <AppTypography fontSize={14} color="#fff">
                    <Box as="span" fontWeight={600} color="#179EF8" textDecoration="underline">
                        Click
                    </Box>{" "}
                    to add a new file or drag and drop it here.
                </AppTypography>}
            <AppTypography color="#7B7B7B">{dropDescription}</AppTypography>
        </>
    );

    return (
        <Flex {...boxProps} flexDirection="column" justifyContent="center" alignItems="center" gap={3} border="1px dashed #3C3C3C" borderRadius={8} cursor={isLoading ? "not-allowed" : "pointer"} {...getRootProps()}>
            {isLoading ? (
                <VStack gap={"1rem"}>
                    <Spinner color="#fff" />
                    <AppTypography fontSize={14} fontWeight={500} color={"#fff"}>Uploading..., Please Wait.</AppTypography>
                </VStack>
            ) : (
                <>
                    <input {...getInputProps()} type="file" name="file" aria-label="Upload file" />
                    {icon ? icon : <AppIcons.HeaderImage />}
                    {dropMessage}
                </>
            )}
        </Flex>
    );
}

export default FileUpload;
