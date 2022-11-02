import CheckBox from "../../../../components/shared/Checkbox/CheckBox-component";
import { Flex, Text } from "@chakra-ui/react";
// this component get variants and selected options and update selected options based on checked option
const OptionCheckboxes = ({
  variants,
  selectedOptions,
  setSelectedOptions,
  disable,
}) => {
  // change selected options with change checkbox for options type
  const onChnageCheckBox = (e) => {
    let newOptions = [];
    if (e.target.checked) {
      newOptions = selectedOptions.map((opt) => opt);
      newOptions.push({ variantName: e.target.value, variantID: e.target.id });
    } else {
      newOptions = selectedOptions.filter(
        (opt) => opt.variantID != e.target.id
      );
    }
    setSelectedOptions(newOptions);
  };

  return (
    <Flex
      mt="40px"
      padding={{ base: "5px 12px", md: "10px 12px" }}
      border="1px solid white"
      borderRadius="12px"
      width="100%"
    >
      <Text
        fontSize={{ base: "14px", md: "20px" }}
        color=" white"
        textAlign="center "
        margin={{ base: "auto 10px auto 10px", md: "auto 15px auto 15px" }}
      >
        Choose options:{" "}
      </Text>
      {variants.map((item) => {
        return (
          <CheckBox
            key={item._id}
            id={item._id}
            change={onChnageCheckBox}
            disabled={disable}
          >
            {item.name}
          </CheckBox>
        );
      })}
    </Flex>
  );
};

export default OptionCheckboxes;
