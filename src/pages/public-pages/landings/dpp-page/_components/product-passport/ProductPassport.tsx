import React, { useState } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { TFunction } from "i18next";

// Components
import AppTypography from "components/common/typography/AppTypography";
import { Link } from "react-router-dom";

interface ProductPassportProps {
  t: TFunction;
}

const getProductPassportData = (t: TFunction) => [
  {
    category: t('productPassport.categories.accessories'),
    productName: t('productPassport.products.moschinoBag.name'),
    product_id: t('productPassport.products.moschinoBag.productId'),
    weight: t('productPassport.products.moschinoBag.weight'),
    traceability: t('productPassport.products.moschinoBag.traceability'),
    manufacturingSite: t('productPassport.products.moschinoBag.manufacturingSite'),
    certifications: t('productPassport.products.moschinoBag.certifications'),
    circularCharacteristics: t('productPassport.products.moschinoBag.circularCharacteristics'),
    sourcingComposition: t('productPassport.products.moschinoBag.sourcingComposition'),
    LCA: t('productPassport.products.moschinoBag.lca'),
    createdDate: t('productPassport.products.moschinoBag.createdDate'),
    imageSrc: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/d59e4ad7ff6ad5611a79950ccb34e7f9ad7ba78a6380a8594979f618c58139b4.png_or.png",
    blockchainLogo: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/af9f8268d446b5ca32242314e0fcf5cfe16018d15d3e14f92d8760b397da047c.png_or.png",
    QR_Code: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fc09f0bd1bc6b56ca3890e4031fa1452cf76ff640010f6a0f2460975e62c551c.png_st.png",
    view3D: "https://demo.threedium.co.uk/abd/bag/",
    videoSrc: "https://upload-file-droplinked.s3.amazonaws.com/09e85bddba18489902a30c2b41fd872eff9aa29107960cea32de7f3b4ff9b781_or.mp4",
  },
  {
    category: t('productPassport.categories.jewelry'),
    productName: t('productPassport.products.patekPhilippeWatch.name'),
    product_id: t('productPassport.products.patekPhilippeWatch.productId'),
    weight: t('productPassport.products.patekPhilippeWatch.weight'),
    traceability: t('productPassport.products.patekPhilippeWatch.traceability'),
    manufacturingSite: t('productPassport.products.patekPhilippeWatch.manufacturingSite'),
    certifications: t('productPassport.products.patekPhilippeWatch.certifications'),
    circularCharacteristics: t('productPassport.products.patekPhilippeWatch.circularCharacteristics'),
    sourcingComposition: t('productPassport.products.patekPhilippeWatch.sourcingComposition'),
    LCA: t('productPassport.products.patekPhilippeWatch.lca'),
    createdDate: t('productPassport.products.patekPhilippeWatch.createdDate'),
    imageSrc: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/ff0c5ea52ce72412f870d129e2d2e0f6794eed3f52ea8a71e07d74ae58f0c734.png_or.png",
    blockchainLogo: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/173b18e608b1d5c6896cbfc5a2c095619812ae12d85a94976c12543fdf83661f.png_or.png",
    QR_Code: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fc09f0bd1bc6b56ca3890e4031fa1452cf76ff640010f6a0f2460975e62c551c.png_st.png",
    view3D: "https://demo.threedium.co.uk/furlan-marri/stopwatch-test/v0.6/",
    videoSrc: "https://upload-file-droplinked.s3.amazonaws.com/55c5ebeab9b5ad69642ba4f7f52acef41f1a38b062389ff657207689198a00d5_or.mp4",
  },
  {
    category: t('productPassport.categories.retail'),
    productName: t('productPassport.products.timberlandBoot.name'),
    product_id: t('productPassport.products.timberlandBoot.productId'),
    weight: t('productPassport.products.timberlandBoot.weight'),
    traceability: t('productPassport.products.timberlandBoot.traceability'),
    manufacturingSite: t('productPassport.products.timberlandBoot.manufacturingSite'),
    certifications: t('productPassport.products.timberlandBoot.certifications'),
    circularCharacteristics: t('productPassport.products.timberlandBoot.circularCharacteristics'),
    sourcingComposition: t('productPassport.products.timberlandBoot.sourcingComposition'),
    LCA: t('productPassport.products.timberlandBoot.lca'),
    createdDate: t('productPassport.products.timberlandBoot.createdDate'),
    imageSrc: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/93a377bbcb80b42940a07d40f34459f955a54f8e4d0c97b8bff1daac0e4f692a.png_or.png",
    blockchainLogo: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/173b18e608b1d5c6896cbfc5a2c095619812ae12d85a94976c12543fdf83661f.png_or.png",
    QR_Code: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fc09f0bd1bc6b56ca3890e4031fa1452cf76ff640010f6a0f2460975e62c551c.png_st.png",
    view3D: "https://dist.unlimited3d.com/dists/61508/a211c691-1652-4504-adf5-aa9aba977728",
    videoSrc: "https://upload-file-droplinked.s3.amazonaws.com/fb4144bc6f7a3a1224f2e48c7199fcfeb9470219ea5331c9ad74f0a218f818a2_or.mp4",
  },
  {
    category: t('productPassport.categories.electronics'),
    productName: t('productPassport.products.playstation5.name'),
    product_id: t('productPassport.products.playstation5.productId'),
    weight: t('productPassport.products.playstation5.weight'),
    traceability: t('productPassport.products.playstation5.traceability'),
    manufacturingSite: t('productPassport.products.playstation5.manufacturingSite'),
    certifications: t('productPassport.products.playstation5.certifications'),
    circularCharacteristics: t('productPassport.products.playstation5.circularCharacteristics'),
    sourcingComposition: t('productPassport.products.playstation5.sourcingComposition'),
    LCA: t('productPassport.products.playstation5.lca'),
    createdDate: t('productPassport.products.playstation5.createdDate'),
    imageSrc: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/033b1fb5db4f5c6c4426fd24c19b64f1d581816c9c7f98d0255b70e914cae7a0.png_or.png",
    blockchainLogo: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/08eef0b07636efb6fad4af0317bf4c0f4cbfc84b5430d391bb5895bd2ed667ba.png_or.png",
    QR_Code: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fc09f0bd1bc6b56ca3890e4031fa1452cf76ff640010f6a0f2460975e62c551c.png_st.png",
    view3D: "https://dist.unlimited3d.com/dists/61509/909dffcd-9288-45dc-bea5-315bc706ce5b",
    videoSrc: "https://upload-file-droplinked.s3.amazonaws.com/fd9869ab28f4196b00a0b56d2407fe28c8f84ec595c0a3fd5313b41dd3b3aab0_or.mp4",
  },
  {
    category: t('productPassport.categories.industrial'),
    productName: t('productPassport.products.samsoniteBag.name'),
    product_id: t('productPassport.products.samsoniteBag.productId'),
    weight: t('productPassport.products.samsoniteBag.weight'),
    traceability: t('productPassport.products.samsoniteBag.traceability'),
    manufacturingSite: t('productPassport.products.samsoniteBag.manufacturingSite'),
    certifications: t('productPassport.products.samsoniteBag.certifications'),
    circularCharacteristics: t('productPassport.products.samsoniteBag.circularCharacteristics'),
    sourcingComposition: t('productPassport.products.samsoniteBag.sourcingComposition'),
    LCA: t('productPassport.products.samsoniteBag.lca'),
    createdDate: t('productPassport.products.samsoniteBag.createdDate'),
    imageSrc: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/033b1fb5db4f5c6c4426fd24c19b64f1d581816c9c7f98d0255b70e914cae7a0.png_or.png",
    blockchainLogo: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/2dcea53f446531e874210baacc1d6e61cfbbff22346cb768d2c15d41aefc259b.png_or.png",
    QR_Code: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fc09f0bd1bc6b56ca3890e4031fa1452cf76ff640010f6a0f2460975e62c551c.png_st.png",
    view3D: "https://marketing-suitcase.threedium.co.uk/index.html?sku=4&lang=en",
    videoSrc: "https://upload-file-droplinked.s3.amazonaws.com/a1b7a18e03b354cb9074918612aad03e22d040c0f6ee8026561c6f0de853ecdb_or.mp4",
  },
];

const ProductPassport = ({ t }: ProductPassportProps) => {
  const productPassportData = getProductPassportData(t);
  const [activeCategory, setActiveCategory] = useState(t('productPassport.categories.accessories'));

  const categories = Array.from(new Set(productPassportData.map(product => product.category)));

  const activeProduct = productPassportData.find(
    (product) => product.category === activeCategory
  );

  const getProductOptions = (t: TFunction) => [
    { label: t('productPassport.productOptions.productId'), value: activeProduct.product_id, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/e8484afab2db79beca0ea52244b7d6022b502bdfc138f0a8304b9a4e0154632c.png_st.png" },
    { label: t('productPassport.productOptions.weight'), value: activeProduct.weight, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a49141c98c67903387ec9f5fa96f7ae134d16abc06f14ab9b9f163e9dfc8d6c.png_st.png" },
    { label: t('productPassport.productOptions.traceability'), value: activeProduct.traceability, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/b7ce0f43bfd9741447959d0d6e7d7ac13b0aee23659bb052b3cc1328fa9611b9.png_st.png" },
    { label: t('productPassport.productOptions.manufacturingSite'), value: activeProduct.manufacturingSite, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/386a3c15720ebecea5a5f23b66cbf48a7a661dd521c3c38914ecb54b0f80abb9.png_st.png" },
    { label: t('productPassport.productOptions.certifications'), value: activeProduct.certifications, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/0518b602ffba9cd2c8539b817e8c3e245b75cd03d27d16ac523231006ccac730.png_st.png" },
    { label: t('productPassport.productOptions.circularCharacteristics'), value: activeProduct.circularCharacteristics, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/6c88f22a538ede68647b3cffeb4798efd19559ee425b8ef844e2b52b3a2bc3b6.png_st.png" },
    { label: t('productPassport.productOptions.sourcingComposition'), value: activeProduct.sourcingComposition, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/b2fc63388419e09779ed114a5e1b2b28f42ffd0a1c37a2baf6bea5b0b0078503.png_st.png" },
    { label: t('productPassport.productOptions.lca'), value: activeProduct.LCA, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/54da0df50de53760d5b9bf4b730c0e28895fbea4c59314a6a353203484c2d87a.png_st.png" },
  ];

  const productOptions = getProductOptions(t);

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"flex-start"}
      width={"100%"}
      maxWidth={"979px"}
      border={"2px solid #2EC99E"}
      borderRadius={"30px"}
      bg={"rgba(0, 0, 0, 0.25)"}
      padding={"30px"}
      flexShrink={0}
      zIndex={99}
      gap={"15px"}
      style={{ backdropFilter: "blur(50px)" }}
      mx="auto"
    >
      {/* header */}
      <Flex alignItems={"center"} justifyContent={"space-evenly"} gap={"22px"} flexWrap={"wrap"}>
        {categories.map((category) => (
          <AppTypography
            key={category}
            fontSize={{ base: "24px", md: "32px" }}
            fontWeight={700}
            color={activeCategory === category ? "#2BCFA1" : "#C2C2C2"}
            textDecoration={activeCategory === category ? "underline" : "none"}
            cursor={"pointer"}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </AppTypography>
        ))}
      </Flex>

      {/* divider */}
      <Flex width={"100%"} height={"2px"} alignSelf={"stretch"} bg={"linear-gradient(90deg, rgba(46, 201, 158, 0.00) 0%, #2EC99E 50%, rgba(46, 201, 158, 0.00) 100%)"} />

      {/* main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Flex alignItems={"center"} flexDirection={{ base: "column", lg: "row" }} gap={"30px"}>
            <Flex
              width={{ base: "100%", lg: "364px" }}
              height={"456px"}
              border={"2px solid #80edce89"}
              borderRadius={"22px"}
              position={"relative"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <video
                src={activeProduct.videoSrc}
                width={"90%"}
                height={"90%"}
                style={{ borderRadius: "16px", maxWidth: "100%", maxHeight: "100%" }}
                loop
                autoPlay
                muted
              />
              <Link to={activeProduct.view3D} target="_blank">
                <Flex position={"absolute"} bottom={"60px"} left={"50%"} transform={"translateX(-50%)"} alignItems={"center"} justifyContent={"center"} borderRadius={"8px"} bgColor={"neutral.gray.1000"} padding={"12px"} width={"160px"} height={"40px"} cursor={"pointer"}>
                  <AppTypography color="main.primary" textAlign={"center"} fontSize={"16px"} fontWeight={700} textTransform={"capitalize"} width={"100%"}>{t('productPassport.view3DModel')}</AppTypography>
                </Flex>
              </Link>
            </Flex>
            <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"10px"}>
              <AppTypography fontSize={{ base: "28px", md: "35px" }} fontWeight={700} color={"#2BCFA1"}>
                {activeProduct.productName}
              </AppTypography>
              {productOptions.map((option) => (
                <Flex alignItems={"center"} gap={"10px"} width={"100%"} key={option.label} flexWrap={"nowrap"} wordBreak={"break-word"}>
                  <Image src={option.icon} width={"40px"} height={"40px"} objectFit={"cover"} />
                  <AppTypography fontSize={{ base: "18px", md: "21px" }}>
                    <span style={{ color: "#2BCFA1", fontWeight: 700, whiteSpace: "nowrap" }}>{option.label} :</span>{" "}
                    <span style={{ color: "#FFF", fontWeight: 500, wordBreak: "break-word" }}>{option.value}</span>
                  </AppTypography>
                </Flex>
              ))}
            </Flex>
          </Flex>

          {/* divider */}
          <Flex width={"100%"} height={"2px"} alignSelf={"stretch"} bg={"linear-gradient(90deg, rgba(46, 201, 158, 0.00) 0%, #2EC99E 50%, rgba(46, 201, 158, 0.00) 100%)"} />

          <Flex alignItems={"center"} justifyContent={"space-between"} flexDirection={{ base: "column", lg: "row" }} gap={"16px"} width={"100%"}>
            <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"10px"} width={"100%"}>
              <AppTypography fontSize={{ base: "28px", md: "35px" }} fontWeight={700} color={"#2BCFA1"}>{t('productPassport.chainOfCustody')}</AppTypography>
              <Flex alignItems={"center"} gap="10px" flexWrap={"wrap"}>
                <Image src={"https://upload-file-flatlay.s3.us-west-2.amazonaws.com/9299c3d7eabfb00567fdba7440c9efc7812e9e9269442e47bbbfc57579bb9c0b.png_st.png"} width={"40px"} height={"40px"} objectFit={"cover"} />
                <AppTypography fontSize={{ base: "20px", md: "25px" }} fontWeight={700} color={"#FFF"}>{activeProduct.createdDate}</AppTypography>
                <Flex width={"5px"} alignSelf={"stretch"} bgColor={"#2BCFA1"} />
                <AppTypography fontSize={{ base: "20px", md: "25px" }} fontWeight={700} color={"#FFF"}>{t('productPassport.productCreated')}</AppTypography>
              </Flex>
            </Flex>
            <Flex width={"80%"} alignItems={"center"} justifyContent={"space-between"} flexDirection={{ base: "column", md: "row" }}>
              <Image src={activeProduct.blockchainLogo} width={"260px"} height={"92px"} objectFit={"contain"} />
              <Image src={activeProduct.QR_Code} width={"92px"} height={"92px"} borderRadius={"8px"} objectFit={"cover"} />
            </Flex>
          </Flex>

        </motion.div>
      </AnimatePresence>
    </Flex>
  );
};

export default ProductPassport;
