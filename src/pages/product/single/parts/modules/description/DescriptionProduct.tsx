import { Box } from '@chakra-ui/react'
import AppTextarea from 'components/common/form/textarea/AppTextarea'
import { EditorState } from 'draft-js';
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import { useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function DescriptionProduct() {
    const { state: { description }, methods: { updateState }, loading } = useContext(productContext)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    
    const update = (text:any) => setEditorState(text)

    return (
        <Box position={"relative"}>
            {/* <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={update}
            />; */}

            <AppTextarea
                label="Description"
                isRequired
                name="description"
                minHeight={200}
                placeholder="Stylish, and Comfortable Long Sleeve T-Shirt..."
                loading={loading}
                value={description}
                onChange={(e) => updateState("description", e.target.value)}
            />
        </Box>
    )
}

export default DescriptionProduct