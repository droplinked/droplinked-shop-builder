import React, { useContext } from 'react'
import InputFieldComponent from 'components/shared/input-field-component/InputFieldComponent'
import { ComponentTitle } from 'pages/prodcut-pages/ProductPages-style'
import InputImagesGroup from 'pages/prodcut-pages/components/InputImageGroupe/Input-images-component'
import { VStack } from '@chakra-ui/react'
import { productContext } from '../../context'
import introductionClass from './model'
import AppCard from 'components/shared/card/AppCard'
import { CardTitle } from 'components/shared/card/component-style'

function Introduction() {
    const { state: { title, description, media }, methods: { updateState } } = useContext(productContext)
    const { refactorImage, defactorImage } = introductionClass

    return (
        <AppCard mini>
            <VStack spacing={10} align={"center"}>
                <CardTitle width={"100%"}>Introduction</CardTitle>
                <InputFieldComponent
                    label="Title"
                    placeholder="Default"
                    value={title}
                    onChange={(e) => updateState("title", e.target.value)}
                />
                <InputFieldComponent
                    label="Description"
                    placeholder="Default"
                    textArea={true}
                    value={description}
                    onChange={(e) => updateState("description", e.target.value)}
                />
                <InputImagesGroup setState={(images) => updateState("media", refactorImage(images))} state={defactorImage(media)} />
            </VStack>
        </AppCard>
    )
}

export default Introduction