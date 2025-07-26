import { Flex } from "@chakra-ui/react"
import { ImageMd } from "assets/icons/System/Image/ImageMd"
import React from "react"
import { useDropzone } from "react-dropzone"
import ControlButtons from "./ControlButtons"
import DropMessage from "./DropMessage"
import LoadingState from "./LoadingState"
import { FileUploadProps } from "./types"

function FileUpload({
    onFileChange,
    dropDescription,
    multiple = false,
    accept,
    isLoading = false,
    boxProps = {},
    icon,
    title,
    value,
}: FileUploadProps) {
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            const selectedFile = acceptedFiles[0]
            onFileChange(selectedFile)
        },
        disabled: isLoading,
        multiple: multiple,
        accept: accept,
    })

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        open()
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        onFileChange(null)
    }

    return (
        <Flex
            {...boxProps}
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={3}
            border="1px dashed #3C3C3C"
            borderRadius={8}
            width="100%"
            height="150px"
            backgroundColor="#1C1C1C"
            backgroundImage={value ? `url(${value})` : 'none'}
            backgroundSize="cover"
            backgroundPosition="center"
            cursor={isLoading ? "not-allowed" : "pointer"}
            {...getRootProps()}
        >
            {value && <ControlButtons onEdit={handleEdit} onRemove={handleRemove} />}

            {isLoading ? (
                <LoadingState />
            ) : (
                !value && (
                    <>
                        <input {...getInputProps()} type="file" name="file" aria-label="Upload file" />
                        {icon ? icon : <ImageMd color="#fff" />}
                        <DropMessage
                            isDragActive={isDragActive}
                            title={title}
                            dropDescription={dropDescription}
                        />
                    </>
                )
            )}
        </Flex>
    )
}

export default FileUpload
