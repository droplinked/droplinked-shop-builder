import AppIcons from 'assest/icon/Appicons'
import React from 'react'

interface IProps {
    onClick: Function
    showed: boolean
}

function ShowPassword({ onClick, showed }: IProps) {
    const Tag = showed ? AppIcons.visibleIcon : AppIcons.invisibleIcon
    return (
        <Tag
            style={{ position: "absolute", top: "15px", right: "20px", cursor: "pointer" }}
            onClick={() => onClick()}
            width="18px"
            height="18px"
        />
    )
}

export default ShowPassword