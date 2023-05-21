import { Button, Stack } from "@chakra-ui/react";
import React from "react";

function ButtonSamples() {
  return (
    <>
      {/* handle size: lg ,md , sm, xs 
       change width base on size 
       variants:  solid , outline 
       isLoading for loading */}

      <Stack direction="row" spacing={4}>
        <Button
          width="200px"
          size="lg"
          variant="solid"
          colorScheme="green"
          color="black"
        >
          Next
        </Button>
        <Button width="200px" size="lg" colorScheme="mainGray">
          Back
        </Button>
        <Button
          size="lg"
          width="200px"
          variant="outline"
          colorScheme="whiteAlpha"
        >
          Back
        </Button>
      </Stack>
      <Stack mt={5} direction="row" spacing={4}>
        <Button size="lg" width="200px" variant="outline" colorScheme="green">
          Next
        </Button>
        <Button
          width="200px"
          size="lg"
          variant="outline"
          colorScheme="whiteAlpha"
          borderColor="line"
        >
          Next
        </Button>
        <Button
          width="200px"
          size="lg"
          variant="solid"
          colorScheme="green"
          isLoading
        >
          Next
        </Button>
      </Stack>
    </>
  );
}

export default ButtonSamples;
