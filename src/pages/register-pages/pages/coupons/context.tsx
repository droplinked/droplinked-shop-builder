import { createContext } from "react";

interface IProps {
  coupons: any
  fetch: Function
}

const CouponsSettingContext = createContext<IProps>({
  coupons: null,
  fetch: () => { }
})

export default CouponsSettingContext