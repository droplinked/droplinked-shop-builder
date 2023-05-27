import AppIcons from 'assest/icon/Appicons'
import React, { useCallback } from 'react'

interface Iprops {
    text: string
}

function ClipboardText({ text }: Iprops) {
    const copy = useCallback((text:string) => navigator.clipboard.writeText(text),[])

    return <AppIcons.copyIcon width={"13px"} onClick={() => copy(text)} style={{ cursor: "pointer" }} height="16px" />
}

export default ClipboardText