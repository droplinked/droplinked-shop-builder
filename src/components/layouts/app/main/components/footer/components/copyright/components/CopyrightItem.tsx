import AppTypography from 'components/common/typography/AppTypography';
import * as React from 'react';
import { Link } from 'react-router-dom';
interface props {
    href: string;
    title: string;
}
function CopyrightItem({ href, title }: props) {
    return (
        <Link to={href}>
            <AppTypography color={"#B1B1B1"} fontWeight={"400"} fontSize={{ sm: "12px", md: "14px" }}>{title}</AppTypography>
        </Link >
    );
}

export default CopyrightItem;