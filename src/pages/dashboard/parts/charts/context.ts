import { createContext } from "react";

export interface IdashboardChartsStates {
  revenue: any
}

// export const dashboardChartsStates: IdashboardChartsStates = {
//   revenue: null
// }

interface IProps {
  states: IdashboardChartsStates
}

const dashboardChartsContext = createContext<IProps>({
  states: {
    revenue: null
  }
})

export default dashboardChartsContext