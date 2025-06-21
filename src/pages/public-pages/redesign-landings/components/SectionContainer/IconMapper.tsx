import { Flex } from '@chakra-ui/react';
import BoltCircle from 'pages/public-pages/redesign-landings/homePage/svgs/icons/BoltCircle';
import ChatHeart from 'pages/public-pages/redesign-landings/homePage/svgs/icons/ChatHeart';
import Globe from 'pages/public-pages/redesign-landings/homePage/svgs/icons/Globe';
import Layer from 'pages/public-pages/redesign-landings/homePage/svgs/icons/Layer';
import Sparkle from 'pages/public-pages/redesign-landings/homePage/svgs/icons/Sparkle';
import Story from 'pages/public-pages/redesign-landings/homePage/svgs/icons/Story';
import React from 'react';


export type Icon = 'bolt' | 'chat-heart' | 'globe' | 'layer' | 'story' | 'sparkle';

interface IconMapperProps {
    icon: Icon;
    [key: string]: any; // For any additional SVG props
}

export default function IconMapper({ icon, ...props }: IconMapperProps) {
    const iconMap = {
        'bolt': BoltCircle,
        'chat-heart': ChatHeart,
        'globe': Globe,
        'layer': Layer,
        'story': Story,
        'sparkle': Sparkle
    };

    const IconComponent = iconMap[icon];

    if (!IconComponent) {
        console.warn(`Icon ${icon} not found`);
        return null;
    }

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
        >
            <IconComponent {...props} />
        </Flex>
    );
}
