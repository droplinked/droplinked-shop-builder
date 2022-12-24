import { Box } from "@chakra-ui/react";
import { request_data } from "./request.data";

import RequestComponent from "../components/request-component/request";

const RequestsPage = () => {
  return (
    <Box w="100%" px="36px">
      {request_data.map((request, i) => {
        return <RequestComponent key={i} request={request} />;
      })}
    </Box>
  );
};

export default RequestsPage;
