import { Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import FormModel from 'components/common/form/FormModel';
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import React, { useState } from 'react';
import "./styles.module.scss";

interface Props {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}

function BlogTags({ tags, setTags }: Props) {
    const [newTag, setNewTag] = useState("")

    const handleAddTag = () => {
        if (!newTag) return
        setTags([...tags, newTag])
        setNewTag("")
    }

    const handleRemoveTag = (index: number) => {
        const copiedTags = [...tags]
        copiedTags.splice(index, 1)
        setTags(copiedTags)
    }

    return (
        <Flex direction="column" gap={3}>
            <FieldLabel label={"Tags"} />
            <Flex
                flexWrap={"wrap"}
                gap={2}
                {...FormModel.styleProps()}
                borderRadius={8}
            >
                {/* tags */}
                {tags.map((tag, index) =>
                    <Flex
                        key={index}
                        alignItems={"center"}
                        gap={3}
                        borderRadius={28}
                        padding={"12px 16px"}
                        backgroundColor={"#1C1C1C"}
                    >
                        {tag}
                        <AppIcons.Close cursor={"pointer"} onClick={() => handleRemoveTag(index)} />
                    </Flex>
                )}

                {/* input */}
                <input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => { e.key === "Enter" && handleAddTag() }}
                />
            </Flex>
        </Flex>
    )
}

export default BlogTags