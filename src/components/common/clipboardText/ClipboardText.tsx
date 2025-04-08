import AppIcons from 'assets/icon/Appicons'
import useAppToast from 'hooks/toast/useToast'
import React, { useCallback } from 'react'

function ClipboardText({ text, iconStyles }: { text: string, iconStyles?: React.CSSProperties }) {
    const { showToast } = useAppToast()

    const handleClick = useCallback(() => {
        navigator.clipboard.writeText(text)
        showToast({ message: 'Copied', type: "success", options: { autoClose: 200, hideProgressBar: true } })
    }, [])

    return <AppIcons.Copy style={{ cursor: "pointer", ...iconStyles }} onClick={handleClick} />
}

export default ClipboardText