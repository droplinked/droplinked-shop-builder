import AppIcons from "assest/icon/Appicons";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface NavigationLinkProps extends LinkProps {
    reverse?: boolean;
}

export default function NavigationLink(props: NavigationLinkProps) {
    const { reverse, ...linkProps } = props;

    return (
        <Link
            style={{
                color: "#179ef8",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 500,
                flexDirection: reverse ? 'row-reverse' : 'row'
            }}
            {...linkProps}
        >
            {props.title}
            <AppIcons.ExternalLink style={{ display: "inline-block" }} />
        </Link>
    );
}
