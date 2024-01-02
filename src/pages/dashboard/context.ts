import { dashboardDates } from "lib/apis/dashboard/interfaces";
import { createContext } from "react";
import dashboardDatepickerModel from "./parts/welcome/parts/datepicker/parts/datepicker/model";

interface IdashboardPageState {
  dateRange: {
    from: Date
    to: Date
    value: dashboardDates
  }
}

const range = dashboardDates.monthly
const { from, to } = dashboardDatepickerModel.getDateRange({ range, startDate: new Date() })
export const dashboardPageState: IdashboardPageState = {
  dateRange: { from, to, value: range }
}

interface IProps {
  states: IdashboardPageState
  method: {
    updateStates: Function
    updateDateRange: Function
  }
}

const dashboardPageContext = createContext<IProps>({
  states: dashboardPageState,
  method: {
    updateStates: () => { },
    updateDateRange: () => { }
  }
})

export default dashboardPageContext