import AppIcons from 'assest/icon/Appicons'
import useAppToast from 'functions/hooks/toast/useToast'
import React, { useCallback } from 'react'

interface Iprops {
    text: string
}

function ClipboardText({ text }: Iprops) {
    const copy = useCallback((text: string) => navigator.clipboard.writeText(text), [])
    const { showToast } = useAppToast()

    return <AppIcons.copyIcon width={"18px"} height="18px" onClick={() => {
        copy(text)
        showToast('Copied', "info", {
            autoClose: 200,
            hideProgressBar: true
        })
    }} style={{ cursor: "pointer" }} />
}

export default ClipboardText