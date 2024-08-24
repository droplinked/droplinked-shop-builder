import React, { useContext, useMemo } from "react"
import { Flex, SimpleGrid } from "@chakra-ui/react"

//Components
import PreviewTypo from "../../../../../parts/typo/PreviewTypo";
import CollectionCard from "./collection-card/CollectionCard";

//Contexts
import { designContext } from "pages/register-pages/pages/design/design-context";
import PreviewActive from "../../../../../parts/active/PreviewActive";
import designPreviewContext from "pages/register-pages/pages/design/parts/preview/context";

// Sample Collection Data
const collections = [
  {
    imageSrc: "/assets/images/templated/sample.png",
    title: "Collection 1",
    description: "10 Items",
  },
  {
    imageSrc: "/assets/images/templated/sample.png",
    title: "Collection 2",
    description: "12 Items",
  },
  {
    imageSrc: "/assets/images/templated/sample.png",
    title: "Collection 3",
    description: "3 Items",
  },
];

const PreviewCollections = () => {
  const { state: { device, optionSelected, shop: { shopDesign: { foreground, textColorParagraphs }} } } = useContext(designContext)
  const { scrollRef } = useContext(designPreviewContext)


  const isDesktop = useMemo(() => device === "desktop", [device])

  return (
    <PreviewActive 
      section="products"
      props={{
        ...optionSelected === "products" && { ref: scrollRef },
        display: "flex",
        padding: "0px",
        borderRadius: "8px",
    }}
    >
      <Flex alignItems={"center"} justifyContent={"center"} gap={"4px"} flexDirection={"column"} alignSelf={"stretch"} bgColor={foreground || "#141414"} padding={"16px"} borderRadius={"8px"}>
        <Flex alignItems={"center"} justifyContent={"space-between"} alignSelf={"stretch"} paddingX={isDesktop ? "" : "10px"}>
          <PreviewTypo fontSize={"16px"} fontWeight={700}>Collections</PreviewTypo>

        </Flex>
        <SimpleGrid columns={isDesktop ? { base: 2, xl: 3 } : 2} spacing={isDesktop ? "20px" : "10px"}>
          {collections.map((collection, index) => (
            <CollectionCard 
              key={index}
              imageSrc={collection.imageSrc} 
              title={collection.title} 
              description={collection.description} 
            />
          ))}
        </SimpleGrid>
      </Flex>
    </PreviewActive>
  )
}

export default PreviewCollections;