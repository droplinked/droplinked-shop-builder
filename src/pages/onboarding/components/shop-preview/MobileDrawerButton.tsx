import { ChevronupLg } from 'assets/icons/Navigation/ChevronUp/ChevronupLg'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'
import ShopPreviewHeader from './ShopPreviewHeader'

export default function MobileDrawerButton({ onOpen }: { onOpen: () => void }) {
    
    return (
        //TODO: Check with the design 
        <AppButton
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
        </AppButton>
    )
}
