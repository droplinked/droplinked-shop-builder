import { CardWrapper, EmptyText } from "./CartDropdown-style";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useCart } from "../../../../context/cart/CartContext";

/* components */
import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import CartDropdownItem from "./CartDropdownItem";
import DropdownContainer from "../dropdown-container/DropdownContainer";

const CartDropdown = ({ show, close }) => {
  const { cart } = useCart();

  let navigate = useNavigate();
  let { shopname } = useParams();

  const ClickCheckuot = () => {
    navigate(`${shopname}/checkout`);
    close();
  };

  return (
    <DropdownContainer show={show} close={close}>
      <CardWrapper>
        {cart == null || cart.items.length == 0 ? (
          <EmptyText>Empty</EmptyText>
        ) : (
          <>
            {cart.items.map((item, i) => {
              return (
                <CartDropdownItem
                  key={i}
                  type={cart.type}
                  product={item}
                  close={close}
                />
              );
            })}
            <Box mt="20px">
              <BasicButton click={ClickCheckuot}> Check out</BasicButton>
            </Box>
          </>
        )}
      </CardWrapper>
    </DropdownContainer>
  );
};

export default CartDropdown;
