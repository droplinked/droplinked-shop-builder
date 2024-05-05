import { Box, Flex, FormLabel } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from "xlsx";

interface Props {
    label: string;
    setExcelData: (data: any) => void
}

function FileUpload({ label, setExcelData }: Props) {
    const [file, setFile] = useState<File | null>(null)

    const onDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0]
        setFile(selectedFile)
        if (selectedFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return

        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const data = new Uint8Array((e.target.result) as ArrayBufferLike)
            const workbook = XLSX.read(data, { type: "array" })

            const groupsSheet = workbook.Sheets["Groups"]
            const shippingGroups = XLSX.utils.sheet_to_json(groupsSheet)

            const rulesSheet = workbook.Sheets["Services"]
            const shippingRules = XLSX.utils.sheet_to_json(rulesSheet)

            const rates = shippingRules.map((rule) => {
                const group = shippingGroups.find(
                    (group) => group["Shipping Groups"] === rule["Shipping Groups"]
                )

                return {
                    name: rule["Service Name"],
                    pricePerUnit:
                        rule["Price (USD) Per KG"] || rule["Price (USD) per Package Size"],
                    estimatedDeliveryDate: rule["Estimated Delivary Date"],
                    countries: group
                        ? group["Countries"].split(",").map((country) => country.trim())
                        : [],
                    groupName: group ? group["Shipping Groups"] : "",
                }
            })

            let createShippingDto: any = {
                calculateBasedOnUnit: rates.some(
                    (rate) =>
                        rate.pricePerUnit !== undefined &&
                        rate.pricePerUnit !== null &&
                        rate.pricePerUnit !== ""
                )
                    ? "WEIGHT"
                    : "SIZE",
                rates,
                isActive: true,
            }

            if (
                shippingRules.some((rule) => rule["Price (USD) Per KG"] !== undefined)
            ) {
                createShippingDto.weightUnit = "KG"
            }

            if (
                shippingRules.some(
                    (rule) => rule["Price (USD) per Package Size"] !== undefined
                )
            ) {
                createShippingDto.sizeUnit = "CM"
            }

            setExcelData(createShippingDto)
        }
        reader.readAsArrayBuffer(selectedFile)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone?.({ onDrop })

    return (
        <Flex direction={"column"} gap={3}>
            <FormLabel margin={0} color={"#fff"}>{label}</FormLabel>
            <Flex
                {...getRootProps()}
                direction={"column"}
                alignItems={"center"}
                gap={2}
                border={"1px dashed #616161"}
                borderRadius={8}
                paddingBlock={6}
                color={"#fff"}
                cursor={"pointer"}
            >
                <input {...getInputProps()} type='file' name='file' accept=".xlsx" />
                <AppIcons.ImportFile />
                {
                    file ?
                        <AppTypography fontSize={14}>{file.name}</AppTypography> :
                        isDragActive ?
                            <AppTypography fontSize={14}>Drop the file here ...</AppTypography> :
                            <AppTypography fontSize={14}><Box as="span" fontWeight={600} color={"#179EF8"} textDecoration={"underline"}>Click</Box> to add a new file or drag and drop it here.</AppTypography>
                }
            </Flex>
        </Flex>
    )
}

export default FileUpload