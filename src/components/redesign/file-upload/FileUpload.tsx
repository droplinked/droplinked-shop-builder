import { Box, Flex, FlexProps, Spinner, VStack } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import React, { ReactNode } from "react";
import { useDropzone } from "react-dropzone";

/**
 * FileUpload Component - Drag and drop file uploader
 * 
 * Provides a file upload area with drag-and-drop functionality and click-to-select
 * options. Shows loading state, customizable messaging, and file type filtering.
 * 
 * @param {object} props - Component props
 * @param {function} props.onFileChange - Callback function when files are selected
 * @param {string} [props.dropDescription] - Additional helper text to display
 * @param {boolean} [props.multiple=false] - Whether to allow multiple file selection
 * @param {object} [props.accept] - File types to accept in format {type: [extension]}
 * @param {boolean} [props.isLoading=false] - Whether to show loading state
 * @param {FlexProps} [props.boxProps] - Additional props for the container flex
 * @param {ReactNode} [props.icon] - Custom icon to display in the uploader
 * @param {ReactNode} [props.title] - Custom title text to replace default message
 */
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
            <AppTypography color="text.subtext.placeholder.dark">{dropDescription}</AppTypography>
        </>
    );

    return (
        <Flex {...boxProps} flexDirection="column" justifyContent="center" alignItems="center" gap={3} border="1px dashed" borderColor="neutral.gray.700" borderRadius={8} cursor={isLoading ? "not-allowed" : "pointer"} {...getRootProps()}>
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
