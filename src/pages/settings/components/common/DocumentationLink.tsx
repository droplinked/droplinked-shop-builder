import AppIcons from "assest/icon/Appicons";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

export default function DocumentationLink(props: LinkProps) {
    return (
        <Link
            style={{
                color: "#179ef8",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 500
            }}
            {...props}
        >
            API Documentation
            <AppIcons.ExternalLink style={{ display: "inline-block" }} />
        </Link>
    );
}
