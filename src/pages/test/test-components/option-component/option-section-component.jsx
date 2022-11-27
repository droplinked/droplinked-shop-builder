import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { SelectTag, OptionTag, ValueInput } from "./option-section-style";
import { useState } from "react";

import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import plus from "../../../../assest/icon/plusIcon.png";

const OptionSection = () => {
  const OPTION_TYPES = {
    SIZE: "SIZE",
    COLOR: "COLOR",
  };

  const [selectedOption, setSelectedOption] = useState(OPTION_TYPES.SIZE);
  const [valuesList, setValuesList] = useState([{ value: "" }]);

  const oprionTypesList = [
    {
      name: "Size",
      value: OPTION_TYPES.SIZE,
    },
    {
      name: "Color",
      value: OPTION_TYPES.COLOR,
    },
  ];

  const changeOption = (e) => setSelectedOption(e.target.value);
  const addNewValue = () => {
    let currentValue = Array.from(valuesList);
    currentValue.push({ value: "" });
    setValuesList(currentValue);
  };

  return (
    <Box w="100%" mb="16px">
      <Box w="100%" bg="subLayer" p="24px 36px">
        <Flex alignItems="center">
          <Text color="white" fontSize="20px" mr="10%" minW="130px">
            Property
          </Text>
          <SelectTag onChange={changeOption}>
            {oprionTypesList.map((option) => {
              return <OptionTag value={option.value}>{option.name}</OptionTag>;
            })}
          </SelectTag>
        </Flex>

        <Box mb="16px"></Box>

        {valuesList.map((value, i) => {
          return (
            <Flex alignItems="center" mb="16px">
              <Text color="white" fontSize="20px" mr="10%" minW="130px">
                Value {i+1}
              </Text>
              <Flex w="100%" alignItems="center">
                <ValueInput value={value.value} placeholder="example" />
                {valuesList.length == i + 1 && (
                  <Image
                    src={plus}
                    onClick={addNewValue}
                    ml="16px"
                    w="24px"
                    h="24px"
                  />
                )}
              </Flex>
            </Flex>
          );
        })}
      </Box>
      <Box mb="10px"></Box>
      <Box w="100%">
        <BasicButton cancelType={true}>Add new</BasicButton>
      </Box>
    </Box>
  );
};
export default OptionSection;
