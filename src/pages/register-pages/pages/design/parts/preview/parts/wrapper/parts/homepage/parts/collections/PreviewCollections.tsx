import React, { useContext, useMemo } from "react"
import { Flex, SimpleGrid } from "@chakra-ui/react"

//Components
import PreviewTypo from "../../../../../parts/typo/PreviewTypo";
import CollectionCard from "./collection-card/CollectionCard";

//Contexts
import { designContext } from "pages/register-pages/pages/design/design-context";

// Sample Collection Data
const collections = [
  {
    imageSrc: "/assets/images/templated/sample.png",
    title: "Collection 1",
  },
  {
    imageSrc: "/assets/images/templated/sample.png",
    title: "Collection 2",
  },
  {
    imageSrc: "/assets/images/templated/sample.png",
    title: "Collection 3",
  },
];

const PreviewCollections = () => {
  const { state: { device } } = useContext(designContext)
  const isDesktop = useMemo(() => device === "desktop", [device])

  return (
    <Flex alignItems={"center"} justifyContent={"center"} gap={"14px"} flexDirection={"column"} alignSelf={"stretch"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} alignSelf={"stretch"} paddingX={isDesktop ? "" : "10px"}>
        <PreviewTypo fontSize={"16px"} fontWeight={700} color={"#FFF"}>Collections</PreviewTypo>
        {/* <PreviewTypo fontSize={"12px"} fontWeight={500} color={"#2BCFA1"} textShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}>See all</PreviewTypo> */}
      </Flex>
      <SimpleGrid columns={isDesktop ? { base: 2, xl: 3 } : 2} spacing={isDesktop ? "25px" : "10px"}>
        {collections.map((collection, index) => (
          <CollectionCard 
            key={index}
            imageSrc={collection.imageSrc} 
            title={collection.title} 
          />
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export default PreviewCollections;