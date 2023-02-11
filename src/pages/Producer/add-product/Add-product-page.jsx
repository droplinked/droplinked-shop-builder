import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import ProductInformation from "../components/product-information-component";
import OptionCheckboxes from "./option-checkbox-component/option-checkbox";
import SkusComponent from "./skus-component/Skus-component";
import AddSkuModal from "../../../modals/add-sku/AddSkuModal";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVariants, postProduct } from "../../../api/producer/Product-api";
import { useToasty } from "../../../context/toastify/ToastContext";
import {
  ModalContainerWrapper,
  TitleText,
  TypeSelect,
  LableInput,
  InputComponent,
} from "./Add-product-style";
import { Flex, Box } from "@chakra-ui/react";
import { SHIPING_TYPES } from "./shippings-type";
import { API_STATUS } from "../../../constant/api-status";

function AddProductPage() {
  
}

export default AddProductPage;
