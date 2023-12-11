import { createContext } from "react";

export interface IdashboardChartsStates {
  revenue: any
  date: 'WEEKLY' | 'MONTHLY' | 'YEARLY'
}

interface IProps {
  states: IdashboardChartsStates
  isLoading: boolean
  method: {
    updateStates: Function
  }
}

export const dashboardChartsStates: IdashboardChartsStates = {
  revenue: null,
  date: 'YEARLY'
}

const dashboardChartsContext = createContext<IProps>({
  states: dashboardChartsStates,
  method: {
    updateStates: () => { }
  },
  isLoading: false
})

export default dashboardChartsContext