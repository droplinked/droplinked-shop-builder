import React, { useContext } from 'react'
import InputFieldComponent from 'components/shared/input-field-component/InputFieldComponent'
import InputImagesGroup from 'pages/prodcut-pages/components/InputImageGroupe/Input-images-component'
import { VStack } from '@chakra-ui/react'
import { productContext } from '../../context'
import introductionClass from './model'
import AppCard from 'components/shared/card/AppCard'
import { CardTitle } from 'components/shared/card/component-style'
import SkeletonProduct from '../skeleton/SkeletonProduct'
import AppInput from 'components/shared/form/textbox/AppInput'

function Introduction() {
    const { state: { title, description, media }, methods: { updateState }, loading } = useContext(productContext)
    const { refactorImage, defactorImage } = introductionClass

    return (
        <AppCard mini>
            <VStack spacing={10} align={"stretch"}>
                <CardTitle width={"100%"}>Introduction</CardTitle>
                <AppInput
                    label="Title"
                    loading={loading}
                    placeholder="Default"
                    value={title}
                    onChange={(e) => updateState("title", e.target.value)}
                />
                <AppInput
                    label="Description"
                    placeholder="Default"
                    loading={loading}
                    textArea={true}
                    value={description}
                    onChange={(e) => updateState("description", e.target.value)}
                />
                <SkeletonProduct width={"30%"} height={"200px"}>
                    <InputImagesGroup setState={(images) => updateState("media", refactorImage(images))} state={defactorImage(media)} />
                </SkeletonProduct>
            </VStack>
        </AppCard>
    )
}

export default Introduction