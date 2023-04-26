import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import LoadingComponent from "components/shared/loading-component/LoadingComponent"; 

const ShopPage = () => {
  let { shopname } = useParams();

  useEffect(() => {
    window.location = `https://droplinked.io/${shopname}`;
  }, [shopname]);

  return (
    <Box minH='70vh'>
      <LoadingComponent />
    </Box>
  );
};

export default ShopPage;
