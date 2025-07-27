import { Flex, IconButton } from "@chakra-ui/react"
import { Refresh1Md } from "assets/icons/Action/Refresh1/Refresh1Md"
import { TrashMd } from "assets/icons/Action/Trash/TrashMd"
import React from "react"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface ControlButtonsProps {
    onEdit: (e: React.MouseEvent) => void
    onRemove: (e: React.MouseEvent) => void
}

const ControlButtons = ({ onEdit, onRemove }: ControlButtonsProps) => {
    const { t } = useLocaleResources('onboarding')
    
    return (
        <Flex
            position="absolute"
            top={2}
            right={2}
            gap={2}
        >
            <IconButton
                aria-label={t('FileUpload.editImage')}
                borderRadius={8}
                background="#292929"
                _hover={{ background: "#292929" }}
                icon={<Refresh1Md color="#fff" />}
                onClick={onEdit}
            />
            <IconButton
                aria-label={t('FileUpload.deleteImage')}
                borderRadius={8}
                background="#292929"
                _hover={{ background: "#292929" }}
                icon={<TrashMd color="#fff" />}
                onClick={onRemove}
            />
        </Flex>
    )
}

export default ControlButtons
