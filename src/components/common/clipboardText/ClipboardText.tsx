import AppIcons from 'assest/icon/Appicons'
import useAppToast from 'functions/hooks/toast/useToast'
import React, { useCallback } from 'react'

function ClipboardText({ text }: { text: string }) {
    const { showToast } = useAppToast()

    const handleClick = useCallback(() => {
        navigator.clipboard.writeText(text)
        showToast({ message: 'Copied', type: "success", options: { autoClose: 200, hideProgressBar: true } })
    }, [])

    return <AppIcons.Copy style={{ cursor: "pointer" }} onClick={handleClick} />
}

export default ClipboardText