import React, { useState } from 'react'
import { useMutation } from 'react-query'
import useAppToast from 'functions/hooks/toast/useToast'
import ImproveWithAi from '../../common/ImproveWithAi'
import { IImproveDescription } from 'lib/apis/ai/interfaces';
import { improveDescription } from 'lib/apis/ai/services';
import { Box } from '@chakra-ui/react';

interface ImproveDescriptionProps {
    description: string;
    onDescriptionChange: (newTitle: string) => void;
}

function ImproveDescription({ description, onDescriptionChange }: ImproveDescriptionProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedItem, setSelectedItem] = useState("")
    const [tempTitleValue, setTempTitleValue] = useState("")
    const { showToast } = useAppToast()

    const { mutateAsync, isLoading } = useMutation(
        (params: IImproveDescription) => improveDescription(params),
        {
            onSuccess: (response) => {
                onDescriptionChange(response.data)
                setIsLoaded(true)
            },
            onError: (error) => {
                showToast({ message: "Oops! Something went wrong. Please try again.", type: "error" })
            }
        }
    )

    const handleSelectItem = async (item: string) => {
        setTempTitleValue(description)
        setSelectedItem(item)
        await mutateAsync({ description, tone: item.toUpperCase() })
    }

    const handleTryAgain = async () => {
        setIsLoaded(false)
        setSelectedItem(selectedItem)
        await mutateAsync({ description, tone: selectedItem.toUpperCase() })
    }

    const handleRevert = () => {
        onDescriptionChange(tempTitleValue)
        setSelectedItem("")
        setIsLoaded(false)
    }

    return (
        <Box position="absolute" bottom={2} right={2}>
            <ImproveWithAi
                isLoaded={isLoaded}
                isDisabled={description.length === 0}
                isLoading={isLoading}
                handleSelectItem={handleSelectItem}
                handleTryAgain={handleTryAgain}
                handleRevert={handleRevert}
                BoxStyles={{ zIndex: 1 }}
            />
        </Box>
    )
}

export default ImproveDescription
