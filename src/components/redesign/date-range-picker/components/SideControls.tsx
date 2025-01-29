import { Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

interface Props {
    setTempValue: (value: Value) => void;
}

export default function SideControls({ setTempValue }: Props) {
    const getDateRange = (type: string): [Date, Date] => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        switch (type) {
            case "Today":
                return [today, today];
            case "This Week":
                const thisWeekStart = new Date(today);
                thisWeekStart.setDate(today.getDate() - today.getDay());
                const thisWeekEnd = new Date(thisWeekStart);
                thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
                return [thisWeekStart, thisWeekEnd];
            case "Last Week":
                const lastWeekStart = new Date(today);
                lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
                const lastWeekEnd = new Date(lastWeekStart);
                lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
                return [lastWeekStart, lastWeekEnd];
            case "This Month":
                return [new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 0)];
            case "Last Month":
                return [new Date(now.getFullYear(), now.getMonth() - 1, 1), new Date(now.getFullYear(), now.getMonth(), 0)];
            case "This Year":
                return [new Date(now.getFullYear(), 0, 1), new Date(now.getFullYear(), 11, 31)];
            case "Last Year":
                return [new Date(now.getFullYear() - 1, 0, 1), new Date(now.getFullYear() - 1, 11, 31)];
            default:
                return [today, today];
        }
    };

    const Items = [
        {
            title: "Today",
            icon: <AppIcons.DayCalendar />,
            onClick: () => setTempValue(getDateRange("Today")),
        },
        {
            title: "This Week",
            icon: <AppIcons.WeekCalendar />,
            onClick: () => setTempValue(getDateRange("This Week")),
        },
        {
            title: "Last Week",
            icon: <AppIcons.WeekCalendar />,
            onClick: () => setTempValue(getDateRange("Last Week")),
        },
        {
            title: "This Month",
            icon: <AppIcons.Monthcalendar />,
            onClick: () => setTempValue(getDateRange("This Month")),
        },
        {
            title: "Last Month",
            icon: <AppIcons.Monthcalendar />,
            onClick: () => setTempValue(getDateRange("Last Month")),
        },
        {
            title: "This Year",
            icon: <AppIcons.Monthcalendar />,
            onClick: () => setTempValue(getDateRange("This Year")),
        },
        {
            title: "Last Year",
            icon: <AppIcons.Monthcalendar />,
            onClick: () => setTempValue(getDateRange("Last Year")),
        },
    ];

    return (
        <Flex p={4} flexDir="column" gap={2} borderLeftRadius="16px" bg="#141414">
            {
                Items.map((item) => {
                    return (
                        <Flex px={3} py={2} gap={1} alignItems="center" cursor={"pointer"} onClick={item.onClick}>
                            {item.icon}
                            <AppTypography color="#fff" fontWeight={500} fontSize={12}>
                                {item.title}
                            </AppTypography>
                        </Flex>
                    )
                })
            }
        </Flex>
    );
}
