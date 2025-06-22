import { Flex } from '@chakra-ui/react';
import BoltCircle from '../svgs/icons/BoltCircle';
import ChatHeart from '../svgs/icons/ChatHeart';
import Globe from '../svgs/icons/Globe';
import Layer from '../svgs/icons/Layer';
import Sparkle from '../svgs/icons/Sparkle';
import Story from '../svgs/icons/Story';
import React from 'react';
import LayerWeb from '../svgs/icons/LayerWeb';


export type Icon = 'bolt' | 'chat-heart' | 'globe' | 'layer' | 'story' | 'sparkle' | 'layer-web';

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
        'sparkle': Sparkle,
        'layer-web': LayerWeb
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
