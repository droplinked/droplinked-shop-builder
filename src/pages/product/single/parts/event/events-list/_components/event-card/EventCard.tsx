import { Box, Flex, Image } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";
import React from "react";


interface IEventCard {
  imageSrc: string;
  date: string;
  location: string;
  host: string;
  title: string;
  isExpired?: boolean;
}


const EventCard = ({imageSrc, date, location, host, title, isExpired}: IEventCard) => {
  return (
    <Flex alignItems={"flex-start"} flexDirection={"column"} gap={"12px"} padding={"12px"} borderRadius={"12px"} border={isExpired ? "" : "1px solid #5D5D5D"} bgColor={isExpired ? "#141414" : ""} position={"relative"}>
      <Box 
        position="relative"
        width={"100%"}
        maxWidth={"327px"}
        height={"185px"}
        borderRadius={"10px"}
        overflow="hidden"
      >
        <Image src={imageSrc} width={"100%"} height={"100%"} borderRadius={"10px"} objectFit={"cover"} />
        {isExpired && 
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          background="linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%)"
          borderRadius={"10px"}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <AppTypography fontSize={"50px"} fontWeight={900} color={"#ffffffb3"}>expired</AppTypography>
        </Box>}
      </Box>

      <AppTypography fontSize={"20px"} fontWeight={700} color={isExpired ? "#808080" : "#FFF"}>{title}</AppTypography>
      
      <Flex alignItems={"center"} justifyContent={"center"} gap={"4px"}>
        <AppIcons.EventCalendar />
        <AppTypography fontSize={"12px"} fontWeight={500} color={isExpired ? "#808080" : "#C2C2C2"}>{date}</AppTypography>
      </Flex>
      
      <Flex alignItems={"center"} justifyContent={"center"} gap={"4px"}>
        <AppIcons.EventLocation />
        <AppTypography fontSize={"12px"} fontWeight={500} color={isExpired ? "#808080" : "#C2C2C2"}>{location}</AppTypography>
      </Flex>

      <Flex alignItems={"center"} justifyContent={"center"} gap={"4px"}>
        <AppIcons.EventHost />
        <AppTypography fontSize={"12px"} fontWeight={500} color={isExpired ? "#808080" : "#C2C2C2"}>Hosted by {host}</AppTypography>
      </Flex>

      <BasicButton width={"100%"} bgColor={isExpired ? "#292929" : "#2BCFA1"} color={isExpired ? "#C2C2C2" : "#084836"} borderColor={isExpired ? "#292929" : ""}>{isExpired ? "Show Expired Event Details" : "Import"}</BasicButton>
    </Flex>
  )
}

export default EventCard;