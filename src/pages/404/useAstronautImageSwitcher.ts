import { useEffect, useState } from "react"

export default function useAstronautImageSwitcher(initialIndex = 0, initialDuration = 1500) {
    const [imageSwitcherState, setImageSwitcherState] = useState({
        currentImageIndex: initialIndex,
        intervalDuration: initialDuration,
    })

    useEffect(() => {
        const switchImages = () => {
            setImageSwitcherState((prevState) => ({
                currentImageIndex: prevState.currentImageIndex === 0 ? 1 : 0,
                intervalDuration: prevState.currentImageIndex === 0 ? 2500 : 1500,
            }))
        }

        const imageChangeInterval = setInterval(switchImages, imageSwitcherState.intervalDuration)
        return () => clearInterval(imageChangeInterval)
    }, [imageSwitcherState.intervalDuration])

    return imageSwitcherState
}