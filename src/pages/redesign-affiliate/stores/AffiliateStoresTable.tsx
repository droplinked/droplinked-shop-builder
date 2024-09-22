import { Avatar, AvatarGroup, Flex } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import AppIcons from "assest/icon/Appicons";
import AppImage from "components/common/image/AppImage";
import AppTypography from "components/common/typography/AppTypography";
import { InvoiceStatus } from "lib/apis/invoice/interfaces";
import { SHOP_URL } from "lib/utils/app/variable";
import { formattedCurrency } from "lib/utils/heper/helpers";
import Table from "pages/invoice-management/components/Table";
import StatusBadge from "pages/invoice-management/invoice-management/components/table/StatusBadge";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

interface ICommunityShop {
    _id: string;
    name: string;
    ownerID: string;
    twitterURL: string | null;
    discordURL: string | null;
    instagramURL: string | null;
    infoEmail: string | null;
    logo: string | null;
    webURL: string | null;
    totalSoldUnits: number;
    createdAt: string;
    products?: any[];
}

interface Props {
    stores: ICommunityShop[];
    isLoading: boolean;
    dataLength: number;
    hasMore: boolean;
    isFetchingNextPage: boolean;
    next: () => void;
}

function AffiliateStoresTable({ stores, isLoading, dataLength, hasMore, isFetchingNextPage, next }: Props) {
    const columns: ColumnDef<ICommunityShop>[] = [
        {
            accessorKey: "_id",
            header: "Merchant",
            cell: (info) => {
                const { logo, name, _id } = info?.row?.original;
                if (logo && name && _id)
                    return (
                        <Link to={`/dashboard/affiliate/stores/${_id}`}>
                            <Flex alignItems={"center"} gap={"16px"} cursor={"pointer"}>
                                {logo ? <AppImage className="polygon-image" width={"56px"} height={"56px"} src={logo} /> : null}
                                <AppTypography fontSize={"16px"} fontWeight={"400"} fontFamily={"Inter"} color="#FFF">
                                    {name}
                                </AppTypography>
                            </Flex>
                        </Link>
                    );
                return "N/A";
            },
        },
        {
            accessorKey: "products",
            header: "Products",
            cell: (info) => (info?.getValue() as Array<any>)?.length,
        },
        { accessorKey: "totalSoldUnits", header: "Units Sold", cell: (info) => info.getValue() },
        { accessorKey: "totalSoldUnits", header: "Avg. Commission", cell: (info) => info.getValue() },
        {
            accessorKey: "products",
            header: "Top Products",
            cell: (info) => (
                <Flex gap={"-8px"}>
                    {(info?.getValue() as Array<any>)?.map((product) => (
                        <AppImage width={"40px"} height={"40px"} rounded={"25px"} src={product?.media?.find((med) => med?.isMain === true)?.url || product?.media?.[0]?.url} />
                    ))}
                </Flex>
            ),
        },
    ];
    return (
        <>
            <Table isLoading={isLoading} columns={columns} data={stores} infiniteScroll={{ dataLength, hasMore, next, isFetchingNextPage }} />
        </>
    );
}

export default AffiliateStoresTable;
