import { Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";
import { getDateRange } from "../helpers/getDateRange";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

interface Props {
  setTempValue: (value: Value) => void;
}

export default function SideControls({ setTempValue }: Props) {
  const handleDateRangeSelect = (type: string) => {
    setTempValue(getDateRange(type));
  };

  const Items = [
    {
      title: "Today",
      icon: <AppIcons.DayCalendar />,
      onClick: () => handleDateRangeSelect("Today"),
    },
    {
      title: "This Week",
      icon: <AppIcons.WeekCalendar />,
      onClick: () => handleDateRangeSelect("This Week"),
    },
    {
      title: "Last Week",
      icon: <AppIcons.WeekCalendar />,
      onClick: () => handleDateRangeSelect("Last Week"),
    },
    {
      title: "This Month",
      icon: <AppIcons.Monthcalendar />,
      onClick: () => handleDateRangeSelect("This Month"),
    },
    {
      title: "Last Month",
      icon: <AppIcons.Monthcalendar />,
      onClick: () => handleDateRangeSelect("Last Month"),
    },
    {
      title: "This Year",
      icon: <AppIcons.Monthcalendar />,
      onClick: () => handleDateRangeSelect("This Year"),
    },
    {
      title: "Last Year",
      icon: <AppIcons.Monthcalendar />,
      onClick: () => handleDateRangeSelect("Last Year"),
    },
  ];

  return (
    <Flex p={4} flexDir="column" gap={2} borderLeftRadius="16px" bg="#141414">
      {Items.map((item) => {
        return (
          <Flex px={3} py={2} gap={1} alignItems="center" cursor={"pointer"} onClick={item.onClick}>
            {item.icon}
            <AppTypography color="#fff" fontWeight={500} fontSize={12}>
              {item.title}
            </AppTypography>
          </Flex>
        );
      })}
    </Flex>
  );
}
