import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Components
import AppSwitch from "components/common/swich";
import AppTypography from "components/common/typography/AppTypography";
import PreviousEventCard from "./_components/previous-event-card/PreviousEventCard";
import EventCard from "./_components/event-card/EventCard";
import EventCardSkeleton from "./_components/event-card-skeleton/EventCardSkeleton";

// Icons
import AppIcons from "assest/icon/Appicons";

// APIs
import { getEvents } from "lib/apis/events/services";

// App Toast
import useAppToast from "functions/hooks/toast/useToast";

// Helpers
import { isDateExpired } from "lib/utils/heper/helpers";

const EventsList = () => {
  const { showToast } = useAppToast();
  const [showExpiredEvents, setShowExpiredEvents] = useState(false);
  const [eventsData, setEventsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEventData = async () => {
    setIsLoading(true);
    try {
      const data = await getEvents();
      const newEventsWithExpiry = data.newEventProducts.map((event) => ({
        ...event,
        isExpired: isDateExpired(event.start),
      }));
      const addedEventsWithExpiry = data.addedEventProducts.map((event) => ({
        ...event,
        isExpired: isDateExpired(event.start),
      }));
      setEventsData({ 
        ...data, 
        newEventProducts: newEventsWithExpiry,
        addedEventProducts: addedEventsWithExpiry,
      });
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const handleEventImported = (eventID: string) => {
    setEventsData((prevData) => {
      const importedEvent = prevData.newEventProducts.find(event => event._id === eventID);
      const updatedAddedEvents = [...prevData.addedEventProducts, importedEvent];
      const updatedNewEvents = prevData.newEventProducts.filter(event => event._id !== eventID);
      
      return {
        ...prevData,
        addedEventProducts: updatedAddedEvents.map((event) => ({
          ...event,
          isExpired: isDateExpired(event.start),
        })),
        newEventProducts: updatedNewEvents,
      };
    });
  };

  const expiredEvents = [
    ...eventsData?.newEventProducts?.filter(event => event.isExpired) || [],
    ...eventsData?.addedEventProducts?.filter(event => event.isExpired) || []
  ];

  const upcomingEvents = eventsData?.newEventProducts?.filter(event => !event.isExpired);
  const addedUpcomingEvents = eventsData?.addedEventProducts?.filter(event => !event.isExpired);

  return (
    <Flex alignItems={"flex-start"} flexDirection={"column"} gap={"20px"} alignSelf={"stretch"} padding={"50px 60px"} borderRadius={"8px"} bgColor={"#1C1C1C"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
        <Flex alignItems={"center"} gap={"12px"}>
          <AppTypography fontSize={"18px"} fontWeight={700} color={"#FFF"}>List of Events</AppTypography>
          <Flex onClick={fetchEventData} cursor={"pointer"}>
            <AppIcons.EventCalendar />
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={"12px"}>
          <AppSwitch isChecked={showExpiredEvents} onChange={() => setShowExpiredEvents(!showExpiredEvents)} />
          <AppTypography fontSize={"14px"} fontWeight={700} color={"#C2C2C2"}>Hide Expired Events</AppTypography>
        </Flex>
      </Flex>

      {/* divider */}
      <Flex height={"1px"} width={"100%"} bgColor={"#5D5D5D"} />

      {addedUpcomingEvents?.length > 0 && 
        <>
          <AppTypography fontSize={"18px"} fontWeight={700} color={"#2BCFA1"}>Previously Imported Events</AppTypography>
          <Flex 
            alignItems={"flex-start"} 
            gap={"18px"} 
            width={"100%"} 
            overflowX={"auto"} 
            css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
            }}
          >
            {addedUpcomingEvents.map((event, index) => (
              <PreviousEventCard event={event} key={index} />
            ))}
          </Flex>
          <Flex height={"1px"} width={"100%"} bgColor={"#5D5D5D"} />
        </>
      }

      <Flex alignItems={"flex-start"} justifyContent={"flex-start"} alignContent={"flex-start"} alignSelf={"stretch"} flexWrap={"wrap"} gap={"10px"} rowGap={"20px"}>
        {isLoading ? 
          Array.from({ length: 6 }).map((_, index) => <EventCardSkeleton key={index} /> )
        :
        upcomingEvents?.length > 0 ?
          upcomingEvents?.map((event, index) => (
            <EventCard event={event} key={index} onEventImported={handleEventImported} />
          ))
          :
          <AppTypography fontSize={"18px"} fontWeight={700} color={"#C2C2C2"}>
            Looks like you don't have any upcoming events right now. <Link to={"https://events.airfoil.studio/"} style={{textDecoration: "underline", color: "#2BCFA1", fontWeight: 600}}>Why not create one?</Link> 🤨
          </AppTypography>
        }
      </Flex>

      {showExpiredEvents && expiredEvents.length > 0 &&
        <>
          {/* divider */}
          <Flex height={"1px"} width={"100%"} bgColor={"#5D5D5D"} />

          <AppTypography fontSize={"18px"} fontWeight={700} color={"#FFF"}>Expired Events</AppTypography>
          <Flex alignItems={"flex-start"} justifyContent={"flex-start"} alignContent={"flex-start"} alignSelf={"stretch"} flexWrap={"wrap"} gap={"10px"} rowGap={"20px"}>
            {expiredEvents?.map((event, index) => (
              <EventCard event={event} isExpired={event.isExpired} key={index} />
            ))}
          </Flex>
        </>
      }
    </Flex>
  );
};

export default EventsList;
