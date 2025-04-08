import AppIcons from 'assets/icon/Appicons'
import React from 'react'

interface IProps {
    onClick: Function
    showed: boolean
}

const ShowPassword = ({ onClick, showed }: IProps) => {
    const Tag = showed ? AppIcons.VisibleIcon : AppIcons.InvisibleIcon
    return (
        <Tag
            style={{ position: "absolute", top: "15px", right: "20px", cursor: "pointer", zIndex: 2 }}
            onClick={() => onClick()}
            width="18px"
            height="18px"
        />
    )
}

export default ShowPassword