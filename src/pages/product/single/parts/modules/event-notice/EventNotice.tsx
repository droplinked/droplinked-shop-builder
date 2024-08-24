import React from "react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";

const EventNotice = () => {
  return (
    <AppTypography display={"flex"} alignItems={"flex-start"} fontSize={"14px"} fontWeight={500} color={"#FFF"}>
      <AppIcons.InfoIcon style={{width: "34px", marginTop: "4px"}} />
      The event name and description displayed are synced with your connected event account. To make any changes to this information, please update it directly in your event account. All updates will be automatically reflected here.
    </AppTypography>
  );
};

export default EventNotice;
