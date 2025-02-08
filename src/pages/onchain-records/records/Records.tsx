import React from 'react'
import EmptyView from '../components/EmptyView';

export default function Records() {
    const hasNFT = true;

    if (!hasNFT) {
        return (
            <EmptyView />
        )
    }

    return (
        <div>Records</div>
    )
}
