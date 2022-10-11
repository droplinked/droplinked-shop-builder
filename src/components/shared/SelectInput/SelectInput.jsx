import { useState, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import {
  SelectInputComponent,
  DropDownWrapper,
  DropDownItem,
} from "./SelectInput-style";

const SelectInput = ({ valueList, value , change ,placeholder }) => {

 // const [value, setValue] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

  const box = useRef(null);

  const closeDropDown = () => setShowDropdown(false);

  useOutsideAlerter(box, closeDropDown);

  const openDropDown = () => setShowDropdown((p) => !p);

  const changeValue = (e) => change(e.target.value);


  const selectItem = (value) => {
    change(value);
    closeDropDown();
  };

  return (
    <Box w="100%" ref={box} pos='relative'>
      <SelectInputComponent
        placeholder={placeholder}
        onChange={changeValue}
        value={value}
        onClick={openDropDown}
        onClickOutside={openDropDown}
        autoComplete='off'
      />
      {showDropdown && (
        <DropDownWrapper>
          {valueList
            .filter((item) =>
              item.value.toLowerCase().includes(value.toLowerCase())
            )
            .map((item) => {
              return (
                <DropDownItem onClick={() => selectItem(item.value)}>
                  {item.label}
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
