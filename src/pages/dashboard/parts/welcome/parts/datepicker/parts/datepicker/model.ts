import { dashboardDates } from "lib/apis/dashboard/interfaces"
import moment from "moment"

interface IgetDateRange {
  startDate: Date
  range: dashboardDates
}

interface IOutputGetDateRange {
  from: Date
  to: Date
}

export enum IdashboardDatepickerTime {
  'add',
  'subtract'
}

interface IprevNextDateRange {
  startDate: Date
  range: dashboardDates
  operation: IdashboardDatepickerTime
}

namespace dashboardDatepickerModel {
  export const ranges = [dashboardDates.weekly, dashboardDates.yearly]

  export const getDateRange = ({ startDate, range }: IgetDateRange): IOutputGetDateRange => {
    if (range === dashboardDates.yearly) return {
      from: moment(startDate).startOf('year').toDate(),
      to: moment(startDate).endOf('year').toDate(),
    }
    else if (range === dashboardDates.weekly) return {
      from: moment(startDate).startOf('week').toDate(),
      to: moment(startDate).endOf('week').toDate(),
    }
    else return {
      from: new Date(),
      to: new Date()
    }

  }

  export const prevNextDateRange = ({ startDate, range, operation }: IprevNextDateRange): IOutputGetDateRange => {
    const getDate = (time: 'year' | 'week', operation: IdashboardDatepickerTime) => {
      if (operation === IdashboardDatepickerTime.add) return {
        from: moment(startDate).add(1, time).startOf(time).toDate(),
        to: moment(startDate).add(1, time).endOf(time).toDate(),
      }
      else return {
        from: moment(startDate).subtract(1, time).startOf(time).toDate(),
        to: moment(startDate).subtract(1, time).endOf(time).toDate(),
      }
    }

    if (range === dashboardDates.yearly) return getDate('year', operation)
    else if (range === dashboardDates.weekly) return getDate('week', operation)
    else return {
      from: new Date(),
      to: new Date()
    }

  }

}

export default dashboardDatepickerModel