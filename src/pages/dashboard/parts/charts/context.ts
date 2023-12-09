import { createContext } from "react";

export interface IdashboardChartsStates {
  revenue: any
}

interface IProps {
  states: IdashboardChartsStates
}

const dashboardChartsContext = createContext<IProps>({
  states: {
    revenue: null
  }
})

export default dashboardChartsContext