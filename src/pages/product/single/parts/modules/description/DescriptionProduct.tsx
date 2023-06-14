import { Box, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classes from './style.module.scss'

function DescriptionProduct() {
    const { state: { description }, methods: { updateState }, loading } = useContext(productContext)

    return (
        <VStack align="stretch" position={"relative"}>
            <FieldLabel label='Description' isRequired />
            <Box className={classes.editor}>
                <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={(e: any) => updateState("description", e)}
                    placeholder="Stylish, and Comfortable Long Sleeve T-Shirt..."
                    modules={{
                        toolbar: [
                            ['bold', 'italic', 'underline'],
                            ['blockquote'],
                            [{ 'align': [] }],
                            [{ 'size': [] }]]
                    }}
                />
            </Box>
        </VStack>
    )
}

export default DescriptionProduct