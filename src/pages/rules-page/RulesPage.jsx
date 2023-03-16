import { Box } from "@chakra-ui/react";
import { useState , useEffect } from "react";

import { PageWrapper } from "./RulesPage-style";

import SearchComponent from "./components/search-component/SearchComponent"
import Loading from "../../components/shared/loading/Loading";

const RulePage = () => {
    const [rules , setRules] = useState(null)


    const updateRules = async() => {
        
    }

    useEffect(()=>{
        updateRules()
    })

  return ( 
    <Box w="100%" h="auto" p="0px 40px">
      <PageWrapper>
        <SearchComponent />
        <Box mb='36px' />
      </PageWrapper>
    </Box>
  );
};

export default RulePage;
