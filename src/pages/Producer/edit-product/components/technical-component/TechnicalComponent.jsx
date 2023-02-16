import { Box } from "@chakra-ui/react";

import { ComponentWrapper, ComponentTitle } from "../../EditProductPage-style";


import CollectionComponent from "./CollectionComponent";
import ShippingComponent from "./ShippingComponent";

// this component handles collection and shipping
const TechnicalComponent = ({ TechnicalData, dispatchTechnical }) => {
  return (
    <ComponentWrapper>
      <ComponentTitle>Technical information</ComponentTitle>
      <Box mb="36px" />
      <CollectionComponent
        TechnicalData={TechnicalData}
        dispatchTechnical={dispatchTechnical}
      />
      <Box mb="24px" />
      <ShippingComponent
        TechnicalData={TechnicalData}
        dispatchTechnical={dispatchTechnical}
      />
    </ComponentWrapper>
  );
};
export default TechnicalComponent;
