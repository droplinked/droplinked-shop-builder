import { ChevronupLg } from 'assets/icons/Navigation/ChevronUp/ChevronupLg'
import Button from 'components/redesign/button/Button'
import React from 'react'
import ShopPreviewHeader from './ShopPreviewHeader'

export default function MobileDrawerButton({ onOpen }: { onOpen: () => void }) {
    return (
        <Button
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            width="100%"
            borderRadius="0"
            onClick={onOpen}
            bg="#141414"
            color="#fff"
            borderColor="#292929"
            borderWidth="1px 0 0 0"
            _hover={{ bg: "#1a1a1a" }}
            zIndex="1000"
            height="auto"
            py={2}
            borderTopRadius={16}
        >
            <ShopPreviewHeader rightIcon={<ChevronupLg color='#fff' />} />
        </Button>
    )
}
