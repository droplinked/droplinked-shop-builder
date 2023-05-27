import { Flex, Text, FormLabel, FormControl } from "@chakra-ui/react";
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';

const InputColor = ({ label, value, change }) => {
  return (
    <FormControl isRequired w="100%">
      <FieldLabel color="#C2C2C2" label={label} />
      <Flex
        w="100%"
        bg="subLayer"
        borderRadius="8px"
        p="13px 24px"
        gap="10px"
        alignItems="center"
      >
        <input
          style={{
            backgroundColor: value,
            width: "20px",
            height: "20px",
          }}
          type="color"
          value={value}
          onChange={(e) => change(e?.target?.value)}
        />

        <Text
          fontFamily="Avenir Next"
          fontWeight="500"
          fontSize="16px"
          color="#808080"
        >
          {value}
        </Text>
      </Flex>
    </FormControl>
  );
};

export default InputColor;
