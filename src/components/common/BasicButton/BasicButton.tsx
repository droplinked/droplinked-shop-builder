import { Box, Button, ButtonProps, Spinner, StyleProps } from "@chakra-ui/react";
import React, { useMemo } from "react";
import AppTypography from "../typography/AppTypography";
import BasicButtonModel, { sizesButton } from "./model/BasicButtonModel";
import { BasicButtonStylesTypes } from "./model/modules/styles";

export interface IBasicButton extends ButtonProps {
  children?: any
  sizes?: sizesButton
  variant?: BasicButtonStylesTypes
}
export default function BasicButton(props: IBasicButton) {
  const { children, sizes, variant } = props
  const { sizesHandel, stylesHandel } = BasicButtonModel

  const style = useMemo((): StyleProps => {
    return {
      ...sizesHandel(sizes).button,
      ...stylesHandel({ variant })
    }
  }, [sizes, variant])

  return (
    <Button
      {...style}
      _disabled={{
        bgColor: "button",
        color: "offText",
        borderColor: "#363636",
        _active: {
          background: "#363636"
        },
        _hover: {
          background: "#363636",
          border: "unset"
        }
      }}
      _active={{
        background: "unset"
      }}
      {...props}
      boxShadow="none !important"
    >
      {props.isLoading !== undefined && props.isLoading === true ? (
        <>
          <Spinner
            thickness="4px"
            position={"absolute"}
            speed="0.65s"
            emptyColor="white"
            color="primary"
            size="xs"
          />
        </>
      ) : null}
      <Box {...props.isLoading && { color: "transparent" }}><AppTypography fontSize={sizesHandel(sizes).text} fontWeight="600">{children}</AppTypography></Box>
    </Button>
  );
}
