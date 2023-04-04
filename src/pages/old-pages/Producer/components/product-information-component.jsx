import { Flex, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi/useApi";
import { getCollections } from "../../../api-service/collections/collectionApiService";

import FormInput from "../../../components/shared/FormInput/FormInput";
import InputImagesGroup from "../../../components/shared/InputImageGroupe/Input-images-component";
import Dropdown from "../../../components/shared/Dropdown/Dropdown-component";


// this component get a state and setState and manage (title , description , collection, images) of produdct
// and a defaultValue for edit product 
// and productInfo is like = { title:string , description:string , productCollectionID:steing ,images:[urls] }
const ProductInformation = ({ productInfo, setProductInfo, defaultValue }) => {
    
  const [images, setImages] = useState(defaultValue ? defaultValue.images : []);
  const [collectionList, setCollection] = useState([]);
  const { getApi } = useApi()

  // change productInfo.images with images state changing
  useEffect(() => {
    onchnageValues(images, "IMAGE");
  }, [images]);

  useEffect(() => {
    initialState();
    initialCollection();
  }, []);

  const initialCollection = async () => {
    let result = await getApi(getCollections())
    if(result){
      let collections = result.collections.map((col) => {
        return { id: col._id, value: col.title };
      });
      setCollection(collections);
    }
  };

  const initialState = () => {
    if (defaultValue) {
      setProductInfo({
        title: defaultValue.title,
        description: defaultValue.description,
        productCollectionID: defaultValue.productCollectionID,
        images: defaultValue.images,
      });
    } else {
      setProductInfo({
        title: "",
        description: "",
        productCollectionID: "",
        images: [],
      });
    }
  };

  const onchnageValues = (e, valueType) => {
    switch (valueType) {
      case "TITLE":
        setProductInfo({ ...productInfo, title: e.target.value });
        return;
      case "DESCRIPTION":
        setProductInfo({ ...productInfo, description: e.target.value });
        return;
      case "IMAGE":
        setProductInfo({ ...productInfo, images: e });
        return;
      case "COLLECTIONID":
        setProductInfo({ ...productInfo, productCollectionID: e.target.value });
        return;
    }
  };

  const changeTitle = (e) => onchnageValues(e, "TITLE");
  const changeValues = (e) => onchnageValues(e, "DESCRIPTION");
  const changeCollection = (e) => onchnageValues(e, "COLLECTIONID");

  return (
    <>
      {productInfo && (
        <Box w="100%">
          <Box w="100%" mb={{ base: "10px", md: "20px" }}>
            <FormInput
              label={"Title"}
              changeValue={changeTitle}
              value={productInfo.title}
            />
          </Box>
          <Box w="100%" mb={{ base: "20px", md: "30px" }}>
            <FormInput
              type={"textarea"}
              label={"Description"}
              changeValue={changeValues}
              value={productInfo.description}
            />
          </Box>

          <Flex justifyContent="center">
            <Box
              w={{ base: "100%", md: "50%" }}
              mb={{ base: "20px", md: "30px" }}
            >
              {collectionList.length > 0 && (
                <Dropdown
                  value={productInfo.productCollectionID}
                  pairArray={collectionList}
                  change={changeCollection}
                  placeholder={
                    defaultValue
                      ? collectionList.find(
                          (collection) =>
                            collection.id == defaultValue.productCollectionID
                        ).value
                      : "Choose collection"
                  }
                />
              )}
            </Box>
          </Flex>
          <Box w="100%" mb={{ base: "10px", md: "20px" }}>
            <InputImagesGroup setState={setImages} state={images} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductInformation;
