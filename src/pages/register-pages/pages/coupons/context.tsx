import { createContext } from "react";

interface IProps {
  coupons: any
  fetch: Function
  updateFilters: Function
}

const CouponsSettingContext = createContext<IProps>({
  coupons: null,
  fetch: () => { },
  updateFilters: () => { },
})

export default CouponsSettingContext