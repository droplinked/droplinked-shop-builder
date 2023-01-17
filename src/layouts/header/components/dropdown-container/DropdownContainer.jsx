import { Box, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";

const keyframe_dropdowncontainer = keyframes`
0% {
    transform: translatey(-200px);
    opacity: 0;
}
100% {
  transform: translatey(0);
  opacity: 1;
}
`;

const DropdownContainer = ({ show, close, children }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const dropdown_animation = prefersReducedMotion
    ? undefined
    : `${keyframe_dropdowncontainer}  0.2s linear`;

  // prevent close modal when click on modal
  const handleChildClick = (event) => {
    event.stopPropagation();
  };

  if (!show) return null;

  return (
    <Box
      w="100%"
      h="100%"
      position="absolute"
      overflow="auto"
      top="0"
      left="0"
      zIndex="30"
      animation={dropdown_animation}
      onClick={close}
    >
      <Box onClick={handleChildClick}>{children}</Box>
    </Box>
  );
};

export default DropdownContainer;
