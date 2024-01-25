import AppIcons from 'assest/icon/Appicons'
import useAppToast from 'functions/hooks/toast/useToast'
import React, { useCallback } from 'react'

interface Iprops {
    text: string
    props?: any
}

function ClipboardText({ text, props }: Iprops) {
    const { showToast } = useAppToast()
    const handleClick = useCallback(() => {
        navigator.clipboard.writeText(text)
        showToast({ message: 'Copied', type: "info", options: { autoClose: 200, hideProgressBar: true } })
    }, [])

    return <AppIcons.CopyIcon width={"18px"} height="18px" {...props} onClick={handleClick} style={{ cursor: "pointer" }} />
}

export default ClipboardText