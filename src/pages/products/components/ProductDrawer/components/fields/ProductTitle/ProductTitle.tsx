import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'
import ImproveTitle from './ImproveTitle'
import { useMutation } from 'react-query'
import { improveTitle } from 'lib/apis/ai/services'
import { IImproveTitle } from 'lib/apis/ai/interfaces'
import useAppToast from 'functions/hooks/toast/useToast'

function ProductTitle() {
    const { values: { product_type, title }, errors, setFieldValue } = useProductForm()
    const [isLoaded, setIsLoaded] = useState(false);
    const { showToast } = useAppToast()
    const { mutateAsync, isLoading } = useMutation(
        (params: IImproveTitle) => improveTitle(params),
        {
            onSuccess: (response) => {
                setFieldValue("title", response.data)
                setIsLoaded(true)
            },
            onError: (error) => {
                showToast({ message: "Oops! Something went wrong. Please try again.", type: "error" })
            }
        }
    )
    const label = product_type === "EVENT" ? 'Event Name' : 'Product Name'

    return (
        <Input
            label={label}
            description='Enter a unique product name. This will be visible to customers.'
            inputProps={{
                placeholder: "e.g., Handmade Ceramic Mug",
                value: title,
                isRequired: true,
                fontSize: 16,
                onChange: (e) => setFieldValue("title", e.target.value),
            }}
            inputContainerProps={{
                padding: "8px 8px 8px 16px",
            }}
            rightElement={
                <ImproveTitle
                    title={title}
                    onTitleChange={(newTitle) => setFieldValue("title", newTitle)}
                    isLoaded={isLoaded}
                    setIsLoaded={(isLoaded) => setIsLoaded(isLoaded)}
                    isLoading={isLoading}
                    mutateAsync={mutateAsync}
                />
            }
            message={errors.title}
            maxCharacters={100}
            {...errors.title && { state: "error" }}
            {...isLoading && { showAnimatedLoading: true }}
        />
    )
}

export default ProductTitle