import AppImage from 'components/common/image/AppImage'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

export default function ImageSkeleton() {
    return (
        Array(3).fill(0).map((_, index) =>
            <AppSkeleton isLoaded={false} key={index} width="full" flexShrink={0}>
                <AppImage
                    alt={`Slide ${index + 1}`}
                    width="100%"
                    height="150px"
                    objectFit="cover"
                />
            </AppSkeleton>
        )
    )
}
