import { useState, useEffect, useRef } from "react";
import { Box, Input } from "@chakra-ui/react";
import {
  SelectInputComponent,
  DropDownWrapper,
  DropDownItem,
} from "./SelectInput-style";
const SelectInput = ({ valueList, placeholder }) => {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const box = useRef(null);

  const closeDropDown = () => setShowDropdown(false);

  useOutsideAlerter(box, closeDropDown);

  const openDropDown = () => setShowDropdown((p) => !p);

  const changeValue = (e) => setValue(e.target.value);

  const selectItem = (value) => {
    setValue(value);
    closeDropDown();
  };

  return (
    <Box w="100%" ref={box}>
      <SelectInputComponent
        placeholder={placeholder}
        onChange={changeValue}
        value={value}
        onClick={openDropDown}
        onClickOutside={openDropDown}
      />
      {showDropdown && (
        <DropDownWrapper>
          {valueList.filter((item) => item.includes(value)).map((item) => {
            return (
              <DropDownItem onClick={() => selectItem(item)}>
                {item}
              </DropDownItem>
            );
          })}
        </DropDownWrapper>
      )}
    </Box>
  );
};

export default SelectInput;

function useOutsideAlerter(ref, closeDropDown) {
  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeDropDown();
      }
    }

    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref]);
}
