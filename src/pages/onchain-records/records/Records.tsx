import React from 'react';
import EmptyView from '../components/EmptyView';
import Filters from './Filters';
import { Flex } from '@chakra-ui/react';

export default function Records() {

    const hasNFT = true;

    if (!hasNFT) {
        return <EmptyView />
    }

    return (
        <Flex flexDirection={"column"} gap={{ base: 4, md: 6 }}>
            <Filters />
        </Flex>
    );
}
