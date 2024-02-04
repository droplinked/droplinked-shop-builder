interface Iupdate {
  payments: any
  key: string
  value: string
  type: string
}

export default class technicalModel {
  static checkPaymentMethod = (payments: Array<any>) => {
    const check = payments.find((el: any) => el.isActive)
    return Boolean(check?.type)
  }

  static refactorPayment = ({ key, payments, value, type }: Iupdate) => {
    const result = payments.map((el: any) => {
      return el.type === type ? {
        ...el,
        [key]: value
      } : el
    })
    return result
  }
}