import { Flex, Link, VStack } from "@chakra-ui/react";
import AppTable from "components/common/table/AppTable";
import AppTypography from "components/common/typography/AppTypography";
import { SHOP_URL } from "lib/utils/app/variable";
import React, { useCallback } from "react";

const ReferralCommunity = ({ referralReports }: { referralReports: any[] }) => {
    const rows = useCallback(() => {
        return referralReports
            ? referralReports.map((report: any) => ({
                  name: {
                      caption: "Store Name",
                      value: `${report.shopName}`,
                  },
                  income: {
                      caption: "Your Income",
                      value: <AppTypography price>{report.amount}</AppTypography>,
                  },
                  link: {
                      caption: "",
                      props: {
                          style: {
                              textAlign: "end",
                          },
                      },
                      value: (
                          <Link href={`${SHOP_URL}/${report.shopName}`} target="_blank">
                              <AppTypography fontSize={"14px"} color={"#33A9EC"} textDecoration={"underline"} textDecorationColor={"#33A9EC"}>
                                  View Store
                              </AppTypography>
                          </Link>
                      ),
                  },
              }))
            : [];
    }, [referralReports]);

    return (
        <VStack align={"stretch"} spacing={"36px"}>
            <Flex direction={"column"} gap={"8px"}>
                <AppTypography fontSize="18px" fontWeight="bold">
                    Your Referral Community
                </AppTypography>
                <AppTypography fontSize={"16px"} color={"lightGray"}>
                    Explore the list of users who've joined our community using to your referral code.
                </AppTypography>
            </Flex>
            <AppTable rows={rows()} props={{ thead: { borderTop: "none", borderBottom: "1px solid #262626" }, tr: { borderBottom: "1px solid #262626" } }} />
        </VStack>
    );
};

export default ReferralCommunity;
