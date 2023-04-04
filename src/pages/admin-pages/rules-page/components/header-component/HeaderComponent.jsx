import { Thead, Tr, Th, Text } from "@chakra-ui/react";

const HeaderComponent = () => {
  return (
    <Thead>
      <Tr>
        <Th>
          <HeaderText>Rule type</HeaderText>
        </Th>
        <Th color="white">
          <HeaderText>Offer</HeaderText>
        </Th>
        <Th color="white">
          <HeaderText>Identifiers</HeaderText>
        </Th>
        <Th color="white">
          <HeaderText>minimum</HeaderText>
        </Th>
      </Tr>
    </Thead>
  );
};

const HeaderText = ({ children }) => {
  return (
    <Text
      fontSize="12px"
      fontWeight="500"
      color="#fff"
      fontFamily="Avenir Next"
    >
      {children}
    </Text>
  );
};

export default HeaderComponent;
