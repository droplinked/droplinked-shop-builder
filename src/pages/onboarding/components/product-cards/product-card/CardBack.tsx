import AppImage from "components/common/image/AppImage"
import React from "react"

interface CardBackProps {
    backBackgroundImage: string
}

function CardBack({ backBackgroundImage }: CardBackProps) {
    return (
        <AppImage
            width="100%"
            height="100%"
            borderRadius={16}
            src={backBackgroundImage}
            objectFit="contain"
            sx={{
                position: 'absolute',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden'
            }}
        />
    )
}

export default CardBack