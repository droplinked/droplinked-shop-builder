import { useCountdown } from "../../../../hooks/countdown/useCountdown";
import {
  CountdownWrapper,
  TextMessage,
  TimeNum,
  TimeText,
  ItemWrapper,
} from "./countdown-component-style";
import { Flex, Box } from "@chakra-ui/react";

const Countdown = () => {

  const [days, hours, minutes, seconds] = useCountdown(
    'Tue Oct 25 2022 10:30:00 GMT+0330'
  );

  


  return (
    <Box pb='36px' w='100%' h='100%'>
    <CountdownWrapper>
      {/* <TextMessage>20% OFF</TextMessage>
      <TextMessage>CrashPunks Holders{" "}    <Box d={{ base: "none", md: "block" }}></Box>48 Hours Only</TextMessage> */}
      <TextMessage>20% off</TextMessage>
      <TextMessage>for CrashPunk NFT Holders</TextMessage>
      {/* <TextMessage></TextMessage>
     */}
      {/* <Flex
       w={{base:"130px",sm:'200px',md:'250px',lg:'180px',xl:'250px'}}
        justifyContent='space-between' mx='auto' mt='10px'>
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
          <TimeText>Secconds</TimeText>
        </ItemWrapper>

      </Flex> */}
    </CountdownWrapper>
    </Box>
  );
};

export default Countdown;
