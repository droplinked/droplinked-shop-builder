import AppIcons from 'assest/icon/Appicons'
import useAppToast from 'functions/hooks/toast/useToast'
import React, { useCallback } from 'react'

interface Iprops {
    text: string
    props?: any
}

function ClipboardText({ text, props }: Iprops) {
    const copy = useCallback((text: string) => navigator.clipboard.writeText(text), [])
    const { showToast } = useAppToast()

    return <AppIcons.CopyIcon width={"18px"} height="18px" {...props} onClick={() => {
        copy(text)
        showToast('Copied', "info", {
            autoClose: 200,
            hideProgressBar: true
        })
    }} style={{ cursor: "pointer" }} />
}

export default ClipboardText