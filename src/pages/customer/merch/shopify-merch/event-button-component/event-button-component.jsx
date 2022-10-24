import {
  EventButtonWrapper,
  EventText,
  CounterWrapper,
  TimeNum,
  ItemWrapper,
  TimeText,
  BuyButton,
} from "./event-button-component-style";

import { useCountdown } from "../../../../../hooks/countdown/useCountdown";
import { Flex } from "@chakra-ui/react";

const EventButton = ({click}) => {
  const [days, hours, minutes, seconds] = useCountdown(
    'Mon Oct 25 2022 24:00:00 GMT-0700'
  );

  return (
    <EventButtonWrapper>
      <Flex w={{base:"100%" ,md:"75%"}} h="100%" alignItems="center" justifyContent="space-between" mb='8px' >
        <EventText>20% OFF - 48 Hours Only CrashPunks Holder</EventText>

        <CounterWrapper>
          <ItemWrapper>
            <TimeNum>{days}</TimeNum>
            <TimeText>Days</TimeText>
          </ItemWrapper>

          <ItemWrapper>
            <TimeNum>{hours}</TimeNum>
            <TimeText>Hours</TimeText>
          </ItemWrapper>

          <ItemWrapper>
            <TimeNum>{minutes}</TimeNum>
            <TimeText>Minutes</TimeText>
          </ItemWrapper>

          <ItemWrapper>
            <TimeNum>{seconds}</TimeNum>
            <TimeText>Seconds</TimeText>
          </ItemWrapper>
        </CounterWrapper>
      </Flex>
      <BuyButton onClick={click}>Buy now</BuyButton>
    </EventButtonWrapper>
  );
};

export default EventButton;
