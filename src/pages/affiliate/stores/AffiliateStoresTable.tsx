import { Flex } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import AppImage from "components/common/image/AppImage";
import AppTypography from "components/common/typography/AppTypography";
import Table from "components/redesign/table/Table";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React from "react";
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
    const { t } = useLocaleResources('affiliate');
    const columns: ColumnDef<ICommunityShop>[] = [
        {
            accessorKey: "_id",
            header: t('AffiliateStoresTable.columns.merchant'),
            cell: (info) => {
                const { logo, name, _id } = info?.row?.original;
                if (name && _id)
                    return (
                        <Link to={`/analytics/affiliate/stores/${_id}`}>
                            <Flex alignItems={"center"} gap={"16px"} cursor={"pointer"}>
                                {logo && logo !== "" ? (
                                    <AppImage rounded={"full"} width={"56px"} height={"56px"} src={logo} />
                                ) : (
                                    <AppImage
                                        rounded="full"
                                        width={"56px"}
                                        height={"56px"}
                                        src="https://upload-file-droplinked.s3.amazonaws.com/05d45f56e28ac067f0689d3e3d33366f1dfb1e62947fedda435f491e4f0b8913.png"
                                    />
                                )}
                                <AppTypography fontSize={"16px"} fontWeight={"400"} fontFamily={"Inter"} color="#FFF">
                                    {name}
                                </AppTypography>
                            </Flex>
                        </Link>
                    );
                return t('AffiliateStoresTable.noData');
            },
        },
        {
            accessorKey: "totalProducts",
            header: t('AffiliateStoresTable.columns.products'),
            cell: (info) => info?.getValue(),
        },
        { accessorKey: "totalSoldUnits", header: t('AffiliateStoresTable.columns.unitsSold'), cell: (info) => info.getValue() },
        { accessorKey: "averageCommission", header: t('AffiliateStoresTable.columns.avgCommission'), cell: (info) => `%${(info.getValue() as Number)?.toFixed(2) || 0}` },
        {
            accessorKey: "topProducts",
            header: t('AffiliateStoresTable.columns.topProducts'),
            cell: (info) => (
                <Flex alignItems={"flex-start"} justifyContent={"flex-start"} overflow={"hidden"}>
                    {(info?.getValue() as Array<any>)?.map((product, index) => (
                        <AppImage key={product?._id} marginLeft={index !== 0 && "-8px"} border="2px solid" borderColor="neutral.gray.1000" backgroundColor={"neutral.gray.1000"} width={"40px"} height={"40px"} rounded={"25px"} src={product?.thumbnail} />
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
