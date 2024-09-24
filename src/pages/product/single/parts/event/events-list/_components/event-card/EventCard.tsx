import React, { useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";

// Icons
import AppIcons from "assest/icon/Appicons";

// Components
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";

// APIs
import { importEvents } from "lib/apis/events/services";

// App Toast
import useAppToast from "functions/hooks/toast/useToast";

// Helpers
import { UTCConverter } from "lib/utils/helpers/helpers";

interface IEventCard {
  event: any;
  isExpired?: boolean;
  onEventImported?: (eventID: string) => void;
}

const EventCard = ({ event, isExpired, onEventImported }: IEventCard) => {
  const { showToast } = useAppToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleImportEvent = async (eventID) => {
    setIsLoading(true)
    try {
      const res = await importEvents({ eventIds: [eventID] })
      setIsLoading(false)
      showToast({ message: "Event successfully imported!", type: "success" })
      onEventImported(eventID);
    } catch (error) {
      setIsLoading(false)
      showToast({ message: error.message, type: "error" })
    }
  }

  return (
    <Flex
      alignItems={"flex-start"}
      flexDirection={"column"}
      gap={"12px"}
      padding={"12px"}
      borderRadius={"12px"}
      border={isExpired ? "" : "1px solid #5D5D5D"}
      bgColor={isExpired ? "#141414" : ""}
      position={"relative"}
      width={"327px"}
      height={"370px"}
    >
      <Box
        position="relative"
        width={"100%"}
        height={"185px"}
        borderRadius={"10px"}
        overflow="hidden"
        flexShrink={0}
      >
        <Image
          src={event?.banner}
          width={"100%"}
          height={"100%"}
          borderRadius={"10px"}
          bgColor={"black"}
          objectFit={"cover"}
        />
        {isExpired && (
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
            <AppTypography fontSize={"50px"} fontWeight={900} color={"#ffffffb3"}>
              expired
            </AppTypography>
          </Box>
        )}
      </Box>

      <AppTypography fontSize={"20px"} fontWeight={700} color={isExpired ? "#808080" : "#FFF"}>
        {event?.title}
      </AppTypography>

      <Flex alignItems={"center"} justifyContent={"center"} gap={"4px"}>
        <AppIcons.EventCalendar />
        <AppTypography fontSize={"12px"} fontWeight={500} color={isExpired ? "#808080" : "#C2C2C2"}>
          {`${UTCConverter(event?.start)}`}
        </AppTypography>
      </Flex>

      <Flex alignItems={"center"} justifyContent={"center"} gap={"4px"}>
        <AppIcons.EventLocation />
        <AppTypography fontSize={"12px"} fontWeight={500} color={isExpired ? "#808080" : "#C2C2C2"}>
          {event?.location}
        </AppTypography>
      </Flex>

      <BasicButton
        width={"100%"}
        bgColor={"#2BCFA1"}
        color={"#084836"}
        isDisabled={isExpired}
        isLoading={isLoading}
        onClick={() => handleImportEvent(event?._id)}
      >
        {isExpired ? "Event Has Expired" : "Import"}
      </BasicButton>
    </Flex>
  );
};

export default EventCard;
