import { Text } from '@chakra-ui/react'
import { MagicwandLg } from 'assets/icons/StyleDesigner/MagicWand/MagicwandLg'
import Button from 'components/redesign/button/Button'
import React from 'react'

export default function AiAssistantButton() {
    return (
        <Button
            fontSize={14}
            fontWeight={500}
            iconSpacing={2}
            leftIcon={<MagicwandLg color="#2BCFA1" />}
            height="48px"
            paddingBlock="14px"
            paddingInline="14px"
            border="1px solid rgba(43, 207, 161, 0.10)"
            background="url(https://upload-file-droplinked.s3.amazonaws.com/3bfc19a5cdaba194e58ebe9ed3c682cb466e32f8001d5e829ddb3fbff71172a6.png)"
        >
            <Text color="#2BCFA1">
                Generate with AI
            </Text>
        </Button>
    )
}
