import { Box, Image, Text, Flex } from "@chakra-ui/react";
import "./test-videro.scss"
const TestVideo = () => {
  return (
    <Box>
      <video
          style={{ maxWidth: "100%", width: "800px", margin: "0 auto" }}
          playsInline
          controls
          autoPlay 
          loop
          muted
          controlsList='none'
          alt="All the devices"
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          
        />


     
    </Box>
  );
};

export default TestVideo;
//