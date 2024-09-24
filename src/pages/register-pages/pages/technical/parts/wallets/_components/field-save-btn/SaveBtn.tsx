import React from "react";
import { Button } from "@chakra-ui/react";

interface ISaveBtnProps {
  onClickHandler: any;
  isDisabled?: boolean;
}

const SaveBtn = ({onClickHandler, isDisabled}: ISaveBtnProps) => {
  return (
    <Button
      height={"32px"} 
      padding={"12px 14px"} 
      borderRadius={"6px"} 
      bgColor={"primary"} 
      color={"#084836"} 
      border={"2px solid #2EC99E"}
      size='sm' 
      isDisabled={isDisabled}
      onClick={onClickHandler}
      _hover={{ borderColor: "#2EC99E", bgColor: "unset", color: "primary", }}
    >
      Save
    </Button>
  )
}

export default SaveBtn;