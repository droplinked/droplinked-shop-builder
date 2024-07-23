import { Flex } from "@chakra-ui/react";
import AppSwitch from "components/common/swich";
import AppTypography from "components/common/typography/AppTypography";
import React, { useState } from "react";
import PreviousEventCard from "./_components/previous-event-card/PreviousEventCard";
import EventCard from "./_components/event-card/EventCard";

const previousEvent = [
  {
    image: "https://upload-file-droplinked.s3.amazonaws.com/eedadf55118509ea32882533ecc968edc1ae95ee6e9d716b8f9912e4464d1795_or.jpeg",
    text: "Event Tech Summit",
    date: "Thursday, Nov 14, 2024, 12:00 AM (Local time)",
    location: "Silicon Valley Conference Center, San Francisco",
    host: "droplinked",
    isExpired: true,
  },
  {
    image: "https://upload-file-droplinked.s3.amazonaws.com/eedadf55118509ea32882533ecc968edc1ae95ee6e9d716b8f9912e4464d1795_or.jpeg",
    text: "Event Tech Summit2",
    date: "Thursday, Nov 14, 2024, 12:00 AM (Local time)",
    location: "Silicon Valley Conference Center, San Francisco",
    host: "droplinked",
    isExpired: true,
  },
  {
    image: "https://upload-file-droplinked.s3.amazonaws.com/eedadf55118509ea32882533ecc968edc1ae95ee6e9d716b8f9912e4464d1795_or.jpeg",
    text: "Event Tech Summit3",
    date: "Thursday, Nov 14, 2024, 12:00 AM (Local time)",
    location: "Silicon Valley Conference Center, San Francisco",
    host: "droplinked",
    isExpired: true,
  },
  {
    image: "https://upload-file-droplinked.s3.amazonaws.com/eedadf55118509ea32882533ecc968edc1ae95ee6e9d716b8f9912e4464d1795_or.jpeg",
    text: "Event Tech Summit4",
    date: "Thursday, Nov 14, 2024, 12:00 AM (Local time)",
    location: "Silicon Valley Conference Center, San Francisco",
    host: "droplinked",
    isExpired: true,
  },
]

const EventsList = () => {
  const [showExpiredEvents, setShowExpiredEvents] = useState(false)

  return (
    <Flex alignItems={"flex-start"} flexDirection={"column"} gap={"20px"} alignSelf={"stretch"} padding={"50px 60px"} borderRadius={"8px"} bgColor={"#1C1C1C"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
        <AppTypography fontSize={"18px"} fontWeight={700} color={"#FFF"}>List of Events</AppTypography>
        <Flex alignItems={"center"} gap={"12px"}>
          <AppSwitch isChecked={showExpiredEvents} onChange={() => setShowExpiredEvents(!showExpiredEvents)} />
          <AppTypography fontSize={"14px"} fontWeight={700} color={"#C2C2C2"}>Hide Expired Events</AppTypography>
        </Flex>
      </Flex>

      {/* divider */}
      <Flex height={"1px"} width={"100%"} bgColor={"#5D5D5D"} />

      <AppTypography fontSize={"18px"} fontWeight={700} color={"#2BCFA1"}>Previously Imported Events</AppTypography>
      <Flex alignItems={"flex-start"} gap={"18px"} width={"100%"}>
        {previousEvent.map((event, index) => (
          <PreviousEventCard imageSrc={event.image} text={event.text} key={index} />
        ))}
      </Flex>

      {/* divider */}
      <Flex height={"1px"} width={"100%"} bgColor={"#5D5D5D"} />

      <Flex alignItems={"flex-start"} justifyContent={"space-between"} alignContent={"flex-start"} alignSelf={"stretch"} flexWrap={"wrap"} rowGap={"20px"}>
        {previousEvent.map((event, index) => (
          <EventCard imageSrc={event.image} title={event.text} date={event.date} location={event.location} host={event.host} key={index} />
        ))}
      </Flex>

      {showExpiredEvents &&
        <>
          {/* divider */}
          <Flex height={"1px"} width={"100%"} bgColor={"#5D5D5D"} />

          <AppTypography fontSize={"18px"} fontWeight={700} color={"#FFF"}>Expired Events</AppTypography>
          <Flex alignItems={"flex-start"} justifyContent={"space-between"} alignContent={"flex-start"} alignSelf={"stretch"} flexWrap={"wrap"} rowGap={"20px"}>
          {previousEvent.map((event, index) => (
            <EventCard imageSrc={event.image} title={event.text} date={event.date} location={event.location} host={event.host} isExpired={event.isExpired} key={index} />
          ))}
          </Flex>
        </>
      }
      
      
    </Flex>
  )
}

export default EventsList;