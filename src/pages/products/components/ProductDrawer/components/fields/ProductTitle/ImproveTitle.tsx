import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { IImproveTitle } from 'lib/apis/ai/interfaces'
import { improveTitle } from 'lib/apis/ai/services'
import useAppToast from 'functions/hooks/toast/useToast'
import ImproveWithAi from '../../common/ImproveWithAi'

interface ImproveTitleProps {
    title: string;
    onTitleChange: (newTitle: string) => void;
}

function ImproveTitle({ title, onTitleChange }: ImproveTitleProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedItem, setSelectedItem] = useState("")
    const [tempTitleValue, setTempTitleValue] = useState("")
    const { showToast } = useAppToast()

    const { mutateAsync, isLoading } = useMutation(
        (params: IImproveTitle) => improveTitle(params),
        {
            onSuccess: (response) => {
                onTitleChange(response.data)
                setIsLoaded(true)
            },
            onError: (error) => {
                showToast({ message: "Oops! Something went wrong. Please try again.", type: "error" })
            }
        }
    )

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
