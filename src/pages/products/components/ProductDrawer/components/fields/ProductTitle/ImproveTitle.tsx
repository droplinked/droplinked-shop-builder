import React, { useState } from 'react'
import { IImproveTitle } from 'lib/apis/ai/interfaces'
import ImproveWithAi from '../../common/ImproveWithAi'

interface ImproveTitleProps {
    title: string;
    onTitleChange: (newTitle: string) => void;
    setIsLoaded: (isLoaded: boolean) => void;
    isLoaded: boolean;
    isLoading: boolean;
    mutateAsync: (params: IImproveTitle) => Promise<any>;
}

function ImproveTitle({ title, onTitleChange, setIsLoaded, isLoaded, mutateAsync, isLoading }: ImproveTitleProps) {
    const [selectedItem, setSelectedItem] = useState("")
    const [tempTitleValue, setTempTitleValue] = useState("")

    const handleSelectItem = async (item: string) => {
        setTempTitleValue(title)
        setSelectedItem(item)
        await mutateAsync({ title, tone: item.toUpperCase() })
    }

    const handleTryAgain = async () => {
        setIsLoaded(false)
        setSelectedItem(selectedItem)
        await mutateAsync({ title, tone: selectedItem.toUpperCase() })
    }

    const handleRevert = () => {
        onTitleChange(tempTitleValue)
        setSelectedItem("")
        setIsLoaded(false)
    }

    return (
        <ImproveWithAi
            isLoaded={isLoaded}
            isDisabled={title.length === 0}
            isLoading={isLoading}
            handleSelectItem={handleSelectItem}
            handleTryAgain={handleTryAgain}
            handleRevert={handleRevert}
            BoxStyles={{ width: isLoaded && "17.1rem" }}
        />
    )
}

export default ImproveTitle
