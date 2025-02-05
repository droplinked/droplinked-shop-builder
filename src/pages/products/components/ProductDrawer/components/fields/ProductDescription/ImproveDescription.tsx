import React, { useState } from 'react'
import ImproveWithAi from '../../common/ImproveWithAi'
import { IImproveDescription } from 'lib/apis/ai/interfaces';
import { Box } from '@chakra-ui/react';

interface ImproveDescriptionProps {
    description: string;
    title: string;
    onDescriptionChange: (newTitle: string) => void;
    isLoaded: boolean;
    setIsLoaded: (isLoaded: boolean) => void;
    isLoading: boolean;
    mutateAsync: (params: IImproveDescription) => Promise<any>;
}

function ImproveDescription({
    description,
    title,
    onDescriptionChange,
    isLoaded,
    setIsLoaded,
    isLoading,
    mutateAsync
}: ImproveDescriptionProps) {
    const [selectedItem, setSelectedItem] = useState("")
    const [tempTitleValue, setTempTitleValue] = useState("")

    const handleSelectItem = async (item: string) => {
        setTempTitleValue(description)
        setSelectedItem(item)
        await mutateAsync({ description, tone: item.toUpperCase(), title })
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
                isDisabled={description.length === 0 && title.length === 0}
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
