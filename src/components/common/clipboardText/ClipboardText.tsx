import AppIcons from 'assest/icon/Appicons'
import React, { useCallback } from 'react'

interface Iprops {
    text: string
}

function ClipboardText({ text }: Iprops) {
    const copy = useCallback((text: string) => navigator.clipboard.writeText(text), [])

    return <AppIcons.copyIcon width={"18px"} height="18px" onClick={() => copy(text)} style={{ cursor: "pointer" }} />
}

export default ClipboardText