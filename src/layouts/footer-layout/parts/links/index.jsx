import { Box, HStack, Text, VStack , Link } from "@chakra-ui/react";
import React from "react";


function Links() {
  const Sublink = (title) => (
    <Text fontSize="sm" color={"#FFF"}>
      {title}
    </Text>
  );
  const Header = (title) => (
    <Text fontSize="sm" color="#808080">
      <strong>{title}</strong>
    </Text>
  );

  return (
    <HStack
      spacing={14}
      width={"100%"}
      alignItems={"baseline"}
      justifyContent={"end"}
    >
      {/* <Box>
                <VStack align="stretch" spacing={3}>
                    <Box>{Header("Contact Us")}</Box>
                    <VStack align="stretch" spacing={3}>
                        <Box><Link to="" >{Sublink("Discord")}</Link></Box>
                        <Box><a href="https://twitter.com/flatlay" rel="noreferrer" target='_blank'><Text fontSize="sm">{Sublink("Twitter")}</Text></a></Box>
                        <Box><Link to="" ><Text fontSize="sm">{Sublink("Instagram")}</Text></Link></Box>
                        <Box><Link to="" ><Text fontSize="sm">{Sublink("LinkedIn")}</Text></Link></Box>
                    </VStack>
                </VStack>
            </Box> */}
      {/* <Box>
        <VStack align="stretch" spacing={3}>
          <Box>{Header("Recourses")}</Box>
          <VStack align="stretch" spacing={3}>
            <Box>
              <Link to="">{Sublink("About us")}</Link>
            </Box>
            <Box>
              <Link to="">{Sublink("Help center")}</Link>
            </Box>
            <Box>
              <Link to="">{Sublink("FAQ")}</Link>
            </Box>
          </VStack>
        </VStack>
      </Box> */}
      <Box>
        <VStack align="stretch" spacing={33}>
          <VStack align="stretch" spacing={3}>
            <Box>{Header("Company")}</Box>
            <VStack align="stretch" spacing={3}>
              <Box>
                <Link target='_blank' href="https://www.flatlay.io">{Sublink("Flatlay")}</Link>
              </Box>
            </VStack>
          </VStack>
          <VStack align="stretch" spacing={3}>
            <Box>{Header("Products")}</Box>
            <VStack align="stretch" spacing={3}>
              <Box>
                <Link target='_blank' href="https://eventdev.droplinked.com" >
                  {Sublink("Events")}
                </Link>
              </Box>
            </VStack>
          </VStack>
        </VStack>
      </Box>
    </HStack>
  );
}

export default Links;
